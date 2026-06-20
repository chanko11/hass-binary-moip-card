import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  BrowseNode,
  HomeAssistant,
  InputConfig,
  LibrarySource,
  ServiceCall,
  SpacesCardConfig,
  StreamSource,
  WsSpace,
  WsZone,
} from "./types";
import {
  browseMsg,
  categoryIcon,
  categoryLabel,
  DEFAULT_SOURCES,
  isConnectSource,
  isPlaying,
  muteCall,
  pct,
  playItemCall,
  sourceHasTransport,
  spaceActivateCall,
  spaceDeactivateCall,
  spaceSetLevelCall,
  spaceSetMasterCall,
  spacesWsMsg,
  transportCall,
  volumeSetCall,
  zoneSetCall,
} from "./logic";

const LEVELS = ["background", "listening", "party"] as const;

(window as unknown as { customCards?: unknown[] }).customCards = [
  ...((window as unknown as { customCards?: unknown[] }).customCards ?? []),
  {
    type: "binary-moip-spaces-card",
    name: "Binary MoIP Listening Spaces",
    description: "Space-first whole-home audio: turn Spaces on at a level, master, fine-tune zones.",
  },
];

@customElement("binary-moip-spaces-card")
export class BinaryMoipSpacesCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SpacesCardConfig;
  @state() private _spaces: WsSpace[] = [];
  @state() private _error: string | null = null;
  @state() private _expanded: Record<string, boolean> = {};
  @state() private _pendingMaster: Record<string, number> = {}; // space id -> master
  @state() private _pendingVol: Record<string, number> = {}; // zone entity_id -> pct
  // Change-source picker (open for one Space at a time).
  @state() private _pickerSpace: string | null = null;
  @state() private _openSource: number | null = null; // index into _sources; null = sibling list
  @state() private _nav: BrowseNode[] = [];
  @state() private _children: BrowseNode[] | null = null;
  @state() private _browseLoading = false;
  @state() private _browseError: string | null = null;
  @state() private _connectHint: string | null = null;
  private _fetched = false;

  private get _sources(): StreamSource[] {
    return this._config.sources ?? DEFAULT_SOURCES;
  }
  /** The configured input (with ma_player) feeding a Space's current source. */
  private _sourceInput(s: WsSpace): InputConfig | undefined {
    return this._inputs.find((i) => i.entity === s.source);
  }

  public setConfig(config: SpacesCardConfig): void {
    this._config = config;
  }
  public getCardSize(): number {
    return 6;
  }
  public static getStubConfig(): SpacesCardConfig {
    return { type: "custom:binary-moip-spaces-card", inputs: [] };
  }

  protected override updated(): void {
    if (this.hass && !this._fetched) {
      this._fetched = true;
      void this._fetchSpaces();
    }
    let vol = this._pendingVol;
    let changed = false;
    for (const [id, p] of Object.entries(vol)) {
      const st = this.hass.states[id];
      if (st && pct(st.attributes.volume_level) === p) {
        if (!changed) { vol = { ...vol }; changed = true; }
        delete vol[id];
      }
    }
    if (changed) this._pendingVol = vol;
  }

  private async _fetchSpaces(): Promise<void> {
    try {
      const res = await this.hass.callWS<{ spaces: WsSpace[] }>(spacesWsMsg());
      this._spaces = res.spaces ?? [];
      this._error = null;
    } catch {
      this._error = "Couldn't read Listening Spaces from the integration.";
    }
  }

  private async _run(call: ServiceCall): Promise<void> {
    await this.hass.callService(call.domain, call.service, call.data);
  }

  /** Run a service then refresh the Space snapshot (for structural changes). */
  private async _runRefresh(call: ServiceCall): Promise<void> {
    await this._run(call);
    await this._fetchSpaces();
  }

  private get _inputs(): InputConfig[] {
    return this._config.inputs ?? [];
  }

  private _inputName(entity: string | null): string | undefined {
    return this._inputs.find((i) => i.entity === entity)?.name;
  }

  // --- actions --------------------------------------------------------------

  private _clearMaster(id: string): void {
    if (id in this._pendingMaster) {
      const m = { ...this._pendingMaster };
      delete m[id];
      this._pendingMaster = m;
    }
  }

  private async _activate(space: WsSpace, source: string, level?: string): Promise<void> {
    const lvl = level ?? space.level ?? "listening";
    const pos = space.master_positions?.[lvl];
    if (pos != null) this._pendingMaster = { ...this._pendingMaster, [space.id]: Math.round(pos) };
    await this._runRefresh(spaceActivateCall(space.id, { source, level: lvl }));
    this._clearMaster(space.id);
  }
  private _deactivate(space: WsSpace): void {
    this._clearMaster(space.id);
    void this._runRefresh(spaceDeactivateCall(space.id));
  }
  private async _setLevel(space: WsSpace, level: string): Promise<void> {
    // Jump the slider to the preset's position immediately, then reconcile.
    const pos = space.master_positions?.[level];
    if (pos != null) this._pendingMaster = { ...this._pendingMaster, [space.id]: Math.round(pos) };
    await this._runRefresh(spaceSetLevelCall(space.id, level));
    this._clearMaster(space.id);
  }
  private async _setMaster(space: WsSpace, value: number, commit: boolean): Promise<void> {
    this._pendingMaster = { ...this._pendingMaster, [space.id]: value };
    if (commit) {
      await this._runRefresh(spaceSetMasterCall(space.id, value));
      this._clearMaster(space.id);
    }
  }

  private _volPct(entityId: string): number {
    return this._pendingVol[entityId] ?? pct(this.hass.states[entityId]?.attributes.volume_level);
  }
  private _setZoneVol(entityId: string, value: number, commit: boolean): void {
    this._pendingVol = { ...this._pendingVol, [entityId]: value };
    if (commit) void this._run(volumeSetCall(entityId, value / 100));
  }
  private _zoneToggle(space: WsSpace, z: WsZone, on: boolean): void {
    void this._runRefresh(zoneSetCall(space.id, z.group_id, on ? "on" : "off"));
  }

  // --- change-source picker (ported from the input card) --------------------

  private _resetPicker(): void {
    this._pickerSpace = null;
    this._openSource = null;
    this._nav = [];
    this._children = null;
    this._browseError = null;
    this._connectHint = null;
  }
  private _openPicker(space: WsSpace): void {
    this._resetPicker();
    this._pickerSpace = space.id;
  }
  private async _loadChildren(maPlayer: string, node?: BrowseNode): Promise<void> {
    this._children = null;
    this._browseLoading = true;
    this._browseError = null;
    try {
      const res = await this.hass.callWS<BrowseNode>(
        browseMsg(maPlayer, node?.media_content_id, node?.media_content_type)
      );
      this._children = res.children ?? [];
    } catch {
      this._browseError = "Couldn't reach Music Assistant.";
      this._children = [];
    } finally {
      this._browseLoading = false;
    }
  }
  private _selectSourceList(): void {
    this._openSource = null;
    this._nav = [];
    this._children = null;
    this._connectHint = null;
  }
  private _selectSource(input: InputConfig, idx: number): void {
    this._openSource = idx;
    this._nav = [];
    this._children = null;
    this._connectHint = null;
    if (isConnectSource(this._sources[idx])) {
      this._connectHint = `Cast from your Spotify app to ${input.name}.`;
    }
  }
  private _browseInto(input: InputConfig, node: BrowseNode): void {
    if (!input.ma_player) return;
    this._nav = [...this._nav, node];
    void this._loadChildren(input.ma_player, node);
  }
  private _navBack(input: InputConfig): void {
    const nav = this._nav.slice(0, -1);
    this._nav = nav;
    this._children = null;
    if (nav.length && input.ma_player) void this._loadChildren(input.ma_player, nav[nav.length - 1]);
  }
  private _onItem(input: InputConfig, node: BrowseNode): void {
    if (node.can_play && input.ma_player) {
      void this._run(playItemCall(input.ma_player, node.media_content_id));
      this._resetPicker();
    } else if (node.can_expand) {
      this._browseInto(input, node);
    }
  }

  // --- render ---------------------------------------------------------------

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-card>
        ${this._config.title ? html`<h1 class="card-header">${this._config.title}</h1>` : nothing}
        <div class="content">
          ${this._error ? html`<div class="note">${this._error}</div>` : nothing}
          ${this._spaces.length
            ? this._spaces.map((s) => this._renderSpace(s))
            : html`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}
        </div>
      </ha-card>
    `;
  }

  private _renderSpace(s: WsSpace) {
    const master = this._pendingMaster[s.id] ?? (s.master != null ? Math.round(s.master) : 0);
    return html`
      <div class="space ${s.active ? "active" : ""}">
        <div class="shead">
          <ha-icon icon=${s.active ? "mdi:speaker-multiple" : "mdi:speaker-off"}></ha-icon>
          <span class="sname">${s.name}</span>
          ${s.active
            ? html`<button class="icon-btn" title="Turn off" @click=${() => this._deactivate(s)}>
                <ha-icon icon="mdi:power"></ha-icon>
              </button>`
            : nothing}
        </div>

        ${s.active ? this._renderActive(s, master) : this._renderOff(s)}

        ${s.active
          ? html`<button class="expand" @click=${() =>
              (this._expanded = { ...this._expanded, [s.id]: !this._expanded[s.id] })}>
              <ha-icon icon=${this._expanded[s.id] ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              ${this._expanded[s.id] ? "Hide zones" : "Zones"}
            </button>`
          : nothing}
        ${s.active && this._expanded[s.id]
          ? html`<div class="zones">${s.zones.map((z) => this._renderZone(s, z))}</div>`
          : nothing}
      </div>
    `;
  }

  private _renderOff(s: WsSpace) {
    if (!this._inputs.length)
      return html`<div class="hint">Add <code>inputs</code> to the card config to choose a source.</div>`;
    return html`
      <div class="hint">Off — pick a source to start:</div>
      <div class="chips">
        ${this._inputs.map(
          (i) => html`<button class="chip" @click=${() => this._activate(s, i.entity, "listening")}>
            <ha-icon icon=${i.icon ?? "mdi:cast-audio"}></ha-icon> ${i.name}
          </button>`
        )}
      </div>
    `;
  }

  private _renderActive(s: WsSpace, master: number) {
    return html`
      <div class="presets">
        ${LEVELS.map(
          (l) => html`<button class="preset ${s.level === l ? "on" : ""}" @click=${() => this._setLevel(s, l)}>
            ${l}
          </button>`
        )}
      </div>
      <div class="master">
        <ha-icon icon="mdi:volume-high"></ha-icon>
        <input type="range" min="0" max="100" .value=${String(master)}
          @input=${(e: Event) => this._setMaster(s, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => this._setMaster(s, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pctv">${master}%</span>
      </div>
      ${this._renderSource(s)}
    `;
  }

  private _renderSource(s: WsSpace) {
    const input = this._sourceInput(s);
    if (input?.ma_player && this._pickerSpace === s.id) {
      return this._renderSourcePicker(input);
    }
    return html`
      <div class="src">
        <span>Source: ${this._inputName(s.source) ?? s.source ?? "—"}</span>
        <div class="chips small">
          ${this._inputs.map(
            (i) => html`<button class="chip ${i.entity === s.source ? "on" : ""}"
              @click=${() => this._activate(s, i.entity)}>${i.name}</button>`
          )}
        </div>
      </div>
      ${input?.ma_player
        ? html`<button class="change-btn" @click=${() => this._openPicker(s)}>
            <ha-icon icon="mdi:playlist-music"></ha-icon> Change content
          </button>`
        : nothing}
      ${this._renderNowPlaying(s.source)}
    `;
  }

  private _renderSourcePicker(input: InputConfig) {
    const sources = this._sources;
    const openIdx = this._openSource;
    const open = openIdx != null ? sources[openIdx] : undefined;
    const drilling = open?.type === "library" && this._nav.length > 0;
    const title =
      openIdx == null
        ? "Change content"
        : this._nav.length
          ? this._nav[this._nav.length - 1].title
          : open?.label ?? "Source";
    let body;
    if (openIdx == null) {
      body = sources.map(
        (src, i) => html`<button class="preset-row" @click=${() => this._selectSource(input, i)}>
          <ha-icon icon=${src.icon ?? (src.type === "connect" ? "mdi:cast" : "mdi:music-box-multiple")}></ha-icon>
          <span>${src.label ?? (src.type === "connect" ? "Spotify Connect" : "Music Assistant")}</span>
          ${src.type === "connect"
            ? html`<span class="on-other">cast</span>`
            : html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>`
      );
    } else if (open?.type === "connect") {
      body = html`<div class="hint">${this._connectHint}</div>`;
    } else if (open?.type === "library") {
      body = this._renderLibraryBody(input, open);
    }
    return html`
      <div class="picker">
        <div class="picker-head">
          ${openIdx != null
            ? html`<button class="icon-btn" title="Back" @click=${() =>
                drilling ? this._navBack(input) : this._selectSourceList()}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>`
            : nothing}
          <span class="picker-title">${title}</span>
          <button class="icon-btn" title="Close" @click=${() => this._resetPicker()}>
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
        ${body}
      </div>
    `;
  }

  private _renderLibraryBody(input: InputConfig, source: LibrarySource) {
    if (this._browseLoading) return html`<div class="hint">Loading…</div>`;
    if (this._browseError) return html`<div class="note">${this._browseError}</div>`;
    if (this._nav.length === 0) {
      const cats = source.categories ?? ["playlists", "radio"];
      return cats.map(
        (cat) => html`<button class="preset-row" @click=${() =>
          this._browseInto(input, {
            title: categoryLabel(cat),
            media_content_id: cat,
            media_content_type: "music_assistant",
            can_expand: true,
          })}>
          <ha-icon icon=${categoryIcon(cat)}></ha-icon>
          <span>${categoryLabel(cat)}</span>
          <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
        </button>`
      );
    }
    const children = this._children ?? [];
    if (!children.length) return html`<div class="hint">Nothing here.</div>`;
    return children.map(
      (node) => html`<button class="preset-row" @click=${() => this._onItem(input, node)}>
        ${node.thumbnail
          ? html`<img class="thumb" src=${node.thumbnail} alt="" />`
          : html`<ha-icon icon=${node.can_play ? "mdi:play-circle-outline" : "mdi:folder-outline"}></ha-icon>`}
        <span>${node.title}</span>
        ${node.can_play ? nothing : html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
      </button>`
    );
  }

  /** Now-playing + transport for the Space's source (a stream that proxies it). */
  private _renderNowPlaying(srcId: string | null) {
    const src = srcId ? this.hass.states[srcId] : undefined;
    if (!src || !sourceHasTransport(src)) return nothing; // physical input / no transport
    const a = src.attributes;
    const playing = src.state === "playing";
    const idle = !isPlaying(src.state);
    return html`
      <div class="np">
        <div class="art">
          ${a.entity_picture
            ? html`<img src=${a.entity_picture} alt="" />`
            : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="t">${idle ? "Nothing playing" : a.media_title ?? ""}</div>
          <div class="ar">${idle ? "" : a.media_artist ?? ""}</div>
        </div>
        <div class="tr">
          <button class="icon-btn" @click=${() => this._run(transportCall(srcId!, "media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${() => this._run(transportCall(srcId!, "media_play_pause"))}>
            <ha-icon icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${() => this._run(transportCall(srcId!, "media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderZone(s: WsSpace, z: WsZone) {
    const eid = z.entity_id;
    const inSpace = eid ? !!this.hass.states[eid] : false;
    const value = eid ? this._volPct(eid) : 0;
    // A zone is "on" in the session if it's routed (has a source) — approximated
    // by the integration; here we offer a toggle that routes/unroutes it.
    const on = eid ? this.hass.states[eid]?.attributes.source !== "None" : false;
    const muted = eid ? !!this.hass.states[eid]?.attributes.is_volume_muted : false;
    return html`
      <div class="zone">
        <button class="icon-btn" title=${on ? "Drop from space" : "Add to space"}
          @click=${() => this._zoneToggle(s, z, !on)}>
          <ha-icon icon=${on ? "mdi:speaker" : "mdi:speaker-off"}></ha-icon>
        </button>
        <span class="zname">${z.name}</span>
        <button class="icon-btn" title=${muted ? "Unmute" : "Mute"} ?disabled=${!inSpace}
          @click=${() => eid && this._run(muteCall(eid, !muted))}>
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <input type="range" min="0" max="100" .value=${String(value)} ?disabled=${!inSpace}
          @input=${(e: Event) => eid && this._setZoneVol(eid, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => eid && this._setZoneVol(eid, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pctv">${value}%</span>
      </div>
    `;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note, .hint { color: var(--secondary-text-color); }
    .hint { font-size: 0.85rem; }

    .space { border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
    .space.active { border-color: var(--primary-color); }
    .shead { display: flex; align-items: center; gap: 8px; }
    .shead ha-icon { color: var(--primary-color); }
    .sname { flex: 1; font-weight: 600; font-size: 1.05rem; }

    .presets { display: flex; gap: 0; border: 1px solid var(--divider-color); border-radius: 10px; overflow: hidden; }
    .preset { flex: 1; padding: 8px; background: none; border: none; border-right: 1px solid var(--divider-color); cursor: pointer; color: var(--primary-text-color); text-transform: capitalize; }
    .preset:last-child { border-right: none; }
    .preset.on { background: var(--primary-color); color: #fff; }

    .master { display: flex; align-items: center; gap: 8px; }
    .master input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 42px; text-align: right; font-variant-numeric: tabular-nums; }

    .src { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--secondary-text-color); }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .chip { display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 14px; border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color); cursor: pointer; }
    .chip.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .chip ha-icon { --mdc-icon-size: 18px; }
    .chips.small .chip { padding: 4px 8px; font-size: 0.82rem; }

    .expand { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; }
    .zones { display: flex; flex-direction: column; gap: 6px; }
    .zone { display: flex; align-items: center; gap: 8px; }
    .zname { flex: 0 0 96px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .zone input[type="range"] { flex: 1; min-width: 0; }

    .icon-btn { background: none; border: none; cursor: pointer; color: var(--primary-text-color); padding: 4px; --mdc-icon-size: 22px; }
    .icon-btn.big { --mdc-icon-size: 30px; color: var(--primary-color); }
    .icon-btn[disabled] { opacity: 0.4; cursor: default; }
    input[type="range"] { accent-color: var(--primary-color); }

    .np { display: flex; align-items: center; gap: 10px; }
    .np .art { width: 44px; height: 44px; border-radius: 6px; overflow: hidden; background: var(--secondary-background-color); display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
    .np .art img { width: 100%; height: 100%; object-fit: cover; }
    .np .meta { flex: 1; min-width: 0; }
    .np .t { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .np .ar { color: var(--secondary-text-color); font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .np .tr { display: flex; align-items: center; flex: 0 0 auto; }

    .change-btn { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 8px; border: 1px solid var(--divider-color); background: none; color: var(--primary-color); cursor: pointer; }
    .change-btn ha-icon { --mdc-icon-size: 18px; }
    .picker { display: flex; flex-direction: column; gap: 2px; }
    .picker-head { display: flex; align-items: center; gap: 6px; padding-bottom: 4px; }
    .picker-title { flex: 1; font-weight: 600; }
    .preset-row { display: flex; align-items: center; gap: 8px; padding: 8px 0; background: none; border: none; width: 100%; text-align: left; color: var(--primary-text-color); cursor: pointer; font-size: 1rem; }
    .preset-row span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .preset-row .chev { color: var(--secondary-text-color); flex: 0 0 auto; }
    .on-other { margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color); }
    .thumb { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }
  `;
}
