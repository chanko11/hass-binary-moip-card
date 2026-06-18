import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Second element shipped in the same bundle: the walk-around calibration card.
import "./binary-moip-calibration-card";
import {
  BrowseNode,
  CardConfig,
  HassEntity,
  HomeAssistant,
  InputConfig,
  LibrarySource,
  ServiceCall,
  StreamSource,
} from "./types";
import {
  areaPictureForEntity,
  averageVolumePct,
  browseMsg,
  categoryIcon,
  categoryLabel,
  DEFAULT_SOURCES,
  discoverZoneIds,
  friendlyName,
  groupZones,
  isConnectSource,
  isPlaying,
  isSourceActive,
  joinCall,
  masterDeltaCalls,
  muteCall,
  pct,
  playItemCall,
  sessionZoneIds,
  sourceHasTransport,
  zoneInScope,
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "./logic";

const VERSION = "2.3.2";
/* eslint-disable no-console */
console.info(
  `%c binary-moip-card %c ${VERSION} `,
  "color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px"
);

(window as unknown as { customCards?: unknown[] }).customCards = [
  ...((window as unknown as { customCards?: unknown[] }).customCards ?? []),
  {
    type: "binary-moip-card",
    name: "Binary MoIP Audio",
    description:
      "Streaming-as-parent whole-home audio: pick an input, swap its content, control its zones.",
  },
];

@customElement("binary-moip-card")
export class BinaryMoipCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _selected?: string;
  @state() private _showAddZones = false;
  // Change-source picker (source-first: siblings -> library browse / connect)
  @state() private _pickerOpen = false;
  @state() private _openSource: number | null = null; // index into _sources; null = sibling list
  @state() private _nav: BrowseNode[] = []; // drill path under a library source
  @state() private _children: BrowseNode[] | null = null;
  @state() private _browseLoading = false;
  @state() private _browseError: string | null = null;
  @state() private _connectHint: string | null = null;
  // UI-only: the source the user last picked per input (for the source-row label)
  @state() private _picked: Record<
    string,
    { label: string; icon: string; item?: string }
  > = {};
  // Optimistic UI — show changes immediately, reconcile when hass catches up.
  @state() private _pendingVol: Record<string, number> = {}; // entity_id -> pct
  @state() private _pendingMaster: Record<string, number> = {}; // input -> pct
  @state() private _pendingMembers: Record<string, Record<string, boolean>> = {}; // input -> zone -> in?
  @state() private _showSourceVol = false;

  public setConfig(config: CardConfig): void {
    if (!config || !Array.isArray(config.inputs) || config.inputs.length === 0) {
      throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");
    }
    for (const i of config.inputs) {
      if (!i.entity || !i.kind) {
        throw new Error("binary-moip-card: each input needs `entity` and `kind`");
      }
    }
    this._config = config;
  }

  private get _sources(): StreamSource[] {
    return this._config.sources ?? DEFAULT_SOURCES;
  }

  public getCardSize(): number {
    return 6;
  }

  public static getStubConfig(): Partial<CardConfig> {
    return { type: "custom:binary-moip-card", inputs: [] };
  }

  /** Selected input: the chosen one if it still exists, else the first available. */
  private get _selectedInput(): InputConfig | undefined {
    const inputs = this._config.inputs;
    if (this._selected) {
      const sel = inputs.find((i) => i.entity === this._selected);
      if (sel && this.hass.states[sel.entity]) return sel;
    }
    return inputs.find((i) => this.hass.states[i.entity]) ?? inputs[0];
  }

  private _src(input: InputConfig): HassEntity | undefined {
    return this.hass.states[input.entity];
  }

  /** {zone_groups, sources} for the reused zone helpers (sources = all inputs). */
  private get _zoneCfg() {
    return {
      zone_groups: this._config.zone_groups,
      sources: this._config.inputs.map((i) => i.entity),
      floors: this._config.floors,
      areas: this._config.areas,
    };
  }

  /** The current source for a stream's tile/row headline — the SOURCE, never the
   *  track. The last source the user picked (UI state) while playing, else a
   *  derived default ("Music Assistant" when playing), else "Idle". */
  private _currentSource(input: InputConfig): {
    label: string;
    icon: string;
    item?: string;
  } {
    const src = this._src(input);
    if (!isPlaying(src?.state)) {
      return { label: "Idle", icon: input.icon ?? "mdi:music" };
    }
    // Detect a Spotify-Connect cast from the backing MA player's live state
    // (source "Spotify Connect" / app_id "spotify_connect--…") — that's the real
    // source even if the user picked something else from the card earlier.
    const a = (input.ma_player ? this.hass.states[input.ma_player] : undefined)?.attributes ?? {};
    if (a.source === "Spotify Connect" || String(a.app_id ?? "").startsWith("spotify_connect")) {
      const cs = this._sources.find((s) => s.type === "connect");
      return { label: cs?.label ?? "Spotify Connect", icon: cs?.icon ?? "mdi:spotify" };
    }
    const picked = this._picked[input.entity];
    if (picked) return picked;
    const lib = this._sources.find((s): s is LibrarySource => s.type === "library");
    return {
      label: lib?.label ?? "Music Assistant",
      icon: lib?.icon ?? "mdi:music-box-multiple",
    };
  }

  // --- change-source picker navigation --------------------------------------

  private _resetPicker(): void {
    this._pickerOpen = false;
    this._openSource = null;
    this._nav = [];
    this._children = null;
    this._browseError = null;
    this._connectHint = null;
  }

  private _openChangeSource(): void {
    this._resetPicker();
    this._pickerOpen = true;
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

  /** Open a sibling source (library shows its categories; connect shows a hint). */
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
    if (nav.length && input.ma_player) {
      void this._loadChildren(input.ma_player, nav[nav.length - 1]);
    }
  }

  /** Tap a browse item: play it if playable, else drill in. */
  private _onItem(input: InputConfig, node: BrowseNode, source: LibrarySource): void {
    if (node.can_play && input.ma_player) {
      // Play the item's URI as-is. Do NOT set radio_mode: it means "seed an
      // endless station from a track/artist", which MA rejects for an actual
      // Radio MediaItem ("Dynamic tracks not supported for Radio MediaItem").
      this._run(playItemCall(input.ma_player, node.media_content_id));
      // Breadcrumb of what was picked: the drill path within the source + item,
      // e.g. "Radio · Pandora · 90s Rock" — makes the source row say what's on.
      const crumb = [...this._nav.map((n) => n.title), node.title]
        .filter(Boolean)
        .join(" · ");
      this._picked = {
        ...this._picked,
        [input.entity]: {
          label: source.label ?? "Music Assistant",
          icon: source.icon ?? "mdi:music-box-multiple",
          item: crumb,
        },
      };
      this._resetPicker();
    } else if (node.can_expand) {
      this._browseInto(input, node);
    }
  }

  private async _run(calls: ServiceCall | ServiceCall[] | null): Promise<void> {
    if (!calls) return; // null = no-op (e.g. Spotify Connect)
    const list = Array.isArray(calls) ? calls : [calls];
    await Promise.all(
      list.map((c) => this.hass.callService(c.domain, c.service, c.data))
    );
  }

  // --- optimistic UI helpers ------------------------------------------------

  /** Drop optimistic state once hass reflects it (called after each render). */
  protected override updated(): void {
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

    let mast = this._pendingMaster;
    let mChanged = false;
    for (const [inputId, p] of Object.entries(mast)) {
      const zs = this._memberStates(inputId);
      if (zs.length && averageVolumePct(zs) === p) {
        if (!mChanged) { mast = { ...mast }; mChanged = true; }
        delete mast[inputId];
      }
    }
    if (mChanged) this._pendingMaster = mast;

    let mem = this._pendingMembers;
    let memChanged = false;
    for (const [inputId, zmap] of Object.entries(mem)) {
      const actual = new Set(sessionZoneIds(this.hass.states[inputId]));
      for (const [zid, want] of Object.entries(zmap)) {
        if (actual.has(zid) === want) {
          if (!memChanged) { mem = { ...mem }; memChanged = true; }
          else if (mem[inputId] === zmap) mem[inputId] = { ...zmap };
          delete mem[inputId][zid];
          if (!Object.keys(mem[inputId]).length) delete mem[inputId];
        }
      }
    }
    if (memChanged) this._pendingMembers = mem;
  }

  /** Session zone states for an input, with optimistic add/remove applied. Shows
   *  ALL joined zones (including any outside the card's floor/area scope, so you
   *  can see everything currently playing). Scope only gates *adding* (the
   *  Add-zones picker) and which zones are *modifiable* — see _ownedStates. */
  private _memberStates(inputId: string): HassEntity[] {
    const ids = new Set(sessionZoneIds(this.hass.states[inputId]));
    const pend = this._pendingMembers[inputId];
    if (pend) for (const [z, want] of Object.entries(pend)) (want ? ids.add(z) : ids.delete(z));
    return [...ids]
      .map((id) => this.hass.states[id])
      .filter((s): s is HassEntity => !!s)
      .sort((a, b) => friendlyName(this.hass, a.entity_id).localeCompare(friendlyName(this.hass, b.entity_id)));
  }

  /** Whether a zone is within the card's configured scope (i.e. modifiable). */
  private _inScope(entityId: string): boolean {
    return zoneInScope(this.hass, entityId, this._zoneCfg);
  }

  /** Displayed volume % for an entity: optimistic value if pending, else live. */
  private _volPct(entityId: string): number {
    return this._pendingVol[entityId] ?? pct(this.hass.states[entityId]?.attributes.volume_level);
  }

  private _setVol(entityId: string, value: number, commit: boolean): void {
    this._pendingVol = { ...this._pendingVol, [entityId]: value };
    if (commit) this._run(volumeSetCall(entityId, value / 100));
  }

  /** Add (want=true) or remove (want=false) a zone from an input — optimistically. */
  private _setMember(input: InputConfig, zid: string, want: boolean): void {
    const cur = this._pendingMembers[input.entity] ?? {};
    this._pendingMembers = {
      ...this._pendingMembers,
      [input.entity]: { ...cur, [zid]: want },
    };
    this._run(want ? joinCall(input.entity, zid) : unjoinCall(zid));
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const input = this._selectedInput;
    const src = input ? this._src(input) : undefined;
    const zoneStates = input ? this._memberStates(input.entity) : [];
    // Zones this card may modify (within its floor/area scope). Out-of-scope
    // members are still shown, but read-only, and master/turn-off skip them.
    const owned = zoneStates.filter((z) => this._inScope(z.entity_id));

    return html`
      <ha-card>
        ${this._config.title
          ? html`<h1 class="card-header">${this._config.title}</h1>`
          : nothing}
        <div class="content">
          ${this._renderRail(input)}
          ${input
            ? this._renderStreamCard(input)
            : html`<div class="note">No input available</div>`}
          ${input && owned.length ? this._renderMaster(input, owned) : nothing}
          ${input
            ? zoneStates.map((z) => this._renderZoneRow(input, z, !this._inScope(z.entity_id)))
            : nothing}
          ${input && src && zoneStates.length === 0
            ? html`<div class="note">No zones yet — add one below to hear this.</div>`
            : nothing}
          ${input && src ? this._renderAddZones(input) : nothing}
        </div>
      </ha-card>
    `;
  }

  // --- input rail -----------------------------------------------------------

  private _renderRail(selected: InputConfig | undefined) {
    return html`
      <div class="rail">
        ${this._config.inputs.map((input) => {
          const src = this._src(input);
          const active = isSourceActive(src);
          const isStream = input.kind === "stream";
          const headline = isStream
            ? this._currentSource(input).label
            : input.name;
          const subtitle = isStream ? input.name : "Line-in";
          const icon =
            input.icon ?? (isStream ? "mdi:cast-audio" : "mdi:music-box-outline");
          const sel = selected && input.entity === selected.entity;
          return html`
            <button
              class="tile ${sel ? "selected" : ""}"
              @click=${() => {
                this._selected = input.entity;
                this._showAddZones = false;
                this._resetPicker();
              }}
            >
              <div class="tile-top">
                <ha-icon icon=${icon}></ha-icon>
                ${active ? html`<span class="dot"></span>` : nothing}
              </div>
              <div class="tile-headline">${headline}</div>
              <div class="tile-sub">${subtitle}</div>
              <div class="tile-state">${src ? src.state : "unavailable"}</div>
            </button>
          `;
        })}
      </div>
    `;
  }

  // --- content slot ---------------------------------------------------------

  /** The bordered sub-card under the rail. Normally shows the source row + now-
   *  playing; while changing source it swaps to the source picker in-place. */
  private _renderStreamCard(input: InputConfig) {
    let body;
    if (input.kind === "physical") {
      body = html`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${input.icon ?? "mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${input.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;
    } else if (this._pickerOpen) {
      body = this._renderSourcePicker(input);
    } else {
      const src = this._src(input);
      const cur = this._currentSource(input);
      const sub = cur.item ?? (isPlaying(src?.state) ? input.name : "Tap Change source");
      body = html`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${cur.icon}></ha-icon>
          <div class="meta">
            <div class="title">${cur.label}</div>
            <div class="artist">${sub}</div>
          </div>
          ${input.ma_player
            ? html`<button class="icon-btn" title="Source volume"
                @click=${() => (this._showSourceVol = !this._showSourceVol)}>
                <ha-icon icon="mdi:tune-vertical"></ha-icon>
              </button>`
            : nothing}
          <button class="change-btn" @click=${() => this._openChangeSource()}>
            Change source
          </button>
        </div>
        ${input.ma_player && this._showSourceVol
          ? this._renderSourceVol(input.ma_player)
          : nothing}
        <div class="sep"></div>
        ${this._renderNowPlaying(src)}
      `;
    }
    return html`<div class="subcard">${body}</div>`;
  }

  // --- source-first picker: siblings -> (library browse | connect hint) -----

  private _renderSourcePicker(input: InputConfig) {
    const sources = this._sources;
    const openIdx = this._openSource;
    const open = openIdx != null ? sources[openIdx] : undefined;

    // Header: title + (back when drilling) + close.
    const drilling = open?.type === "library" && this._nav.length > 0;
    const title =
      openIdx == null
        ? `Change source — ${input.name}`
        : (this._nav.length
            ? this._nav[this._nav.length - 1].title
            : open?.label ?? "Source");
    const header = html`
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
    `;

    let body;
    if (openIdx == null) {
      // sibling source list, plus a Turn-off row when something's playing
      const src = this._src(input);
      const playing = isPlaying(src?.state) && sourceHasTransport(src);
      body = html`
        ${sources.map(
          (s, i) => html`
            <button class="preset-row" @click=${() => this._selectSource(input, i)}>
              <ha-icon icon=${s.icon ?? (s.type === "connect" ? "mdi:cast" : "mdi:music-box-multiple")}></ha-icon>
              <span>${s.label ?? (s.type === "connect" ? "Spotify Connect" : "Music Assistant")}</span>
              ${s.type === "connect"
                ? html`<span class="on-other">cast</span>`
                : html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
            </button>
          `
        )}
        ${playing
          ? html`
              <button class="preset-row clear" @click=${() => this._clearSource(input)}>
                <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                <span>Turn off — stop playing</span>
              </button>
            `
          : nothing}
      `;
    } else if (open?.type === "connect") {
      body = html`<div class="hint">${this._connectHint}</div>`;
    } else if (open?.type === "library") {
      body = this._renderLibraryBody(input, open);
    }

    return html`<div class="picker">${header}${body}</div>`;
  }

  private _selectSourceList(): void {
    this._openSource = null;
    this._nav = [];
    this._children = null;
    this._connectHint = null;
  }

  /** Clear the source: stop playback on the stream (zones stay attached). */
  private _clearSource(input: InputConfig): void {
    this._run({ domain: "media_player", service: "media_stop", data: { entity_id: input.entity } });
    const next = { ...this._picked };
    delete next[input.entity];
    this._picked = next;
    this._resetPicker();
  }

  private _renderLibraryBody(input: InputConfig, source: LibrarySource) {
    if (this._browseLoading) {
      return html`<div class="hint">Loading…</div>`;
    }
    if (this._browseError) {
      return html`<div class="note">${this._browseError}</div>`;
    }
    // Top level of the library source = the configured categories.
    if (this._nav.length === 0) {
      const cats = source.categories ?? ["playlists", "radio"];
      return cats.map(
        (cat) => html`
          <button
            class="preset-row"
            @click=${() =>
              this._browseInto(input, {
                title: categoryLabel(cat),
                media_content_id: cat,
                media_content_type: "music_assistant",
                can_expand: true,
              })}
          >
            <ha-icon icon=${categoryIcon(cat)}></ha-icon>
            <span>${categoryLabel(cat)}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>
        `
      );
    }
    // Drilled into a category/folder: list its children.
    const children = this._children ?? [];
    if (!children.length) {
      return html`<div class="hint">Nothing here.</div>`;
    }
    return children.map(
      (node) => html`
        <button class="preset-row" @click=${() => this._onItem(input, node, source)}>
          ${node.thumbnail
            ? html`<img class="thumb" src=${node.thumbnail} alt="" />`
            : html`<ha-icon icon=${node.can_play ? "mdi:play-circle-outline" : "mdi:folder-outline"}></ha-icon>`}
          <span>${node.title}</span>
          ${node.can_play
            ? nothing
            : html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
        </button>
      `
    );
  }

  // --- now-playing + transport (reused from v1) -----------------------------

  private _renderNowPlaying(source: HassEntity | undefined) {
    if (!source) return nothing;
    if (!sourceHasTransport(source)) {
      return html`<div class="note">No transport for this input.</div>`;
    }
    const a = source.attributes;
    const idle = !isPlaying(source.state);
    const playing = source.state === "playing";
    return html`
      <div class="now-playing ${idle ? "idle" : ""}">
        <div class="art">
          ${a.entity_picture
            ? html`<img src=${a.entity_picture} alt="" />`
            : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${idle ? "Nothing playing" : a.media_title ?? ""}</div>
          <div class="artist">${idle ? "Pick a source" : a.media_artist ?? ""}</div>
        </div>
        <div class="transport">
          <button class="icon-btn" @click=${() => this._run(transportCall(source.entity_id, "media_previous_track"))}>
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="icon-btn big" @click=${() => this._run(transportCall(source.entity_id, "media_play_pause"))}>
            <ha-icon icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button class="icon-btn" @click=${() => this._run(transportCall(source.entity_id, "media_next_track"))}>
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  // --- master + zone rows (reused from v1) ----------------------------------

  private _renderSourceVol(maPlayer: string) {
    const value = this._volPct(maPlayer);
    return html`
      <div class="row src-vol">
        <ha-icon icon="mdi:cast-audio"></ha-icon>
        <span class="row-name">Source vol</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @input=${(e: Event) => this._setVol(maPlayer, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => this._setVol(maPlayer, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pct">${value}%</span>
      </div>
    `;
  }

  private _renderMaster(input: InputConfig, zoneStates: HassEntity[]) {
    const disp = zoneStates.length
      ? Math.round(
          zoneStates.reduce((s, z) => s + this._volPct(z.entity_id), 0) / zoneStates.length
        )
      : 0;
    const value = this._pendingMaster[input.entity] ?? disp;
    return html`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @input=${(e: Event) =>
            (this._pendingMaster = {
              ...this._pendingMaster,
              [input.entity]: Number((e.target as HTMLInputElement).value),
            })}
          @change=${(e: Event) =>
            this._commitMaster(input, zoneStates, Number((e.target as HTMLInputElement).value))} />
        <span class="pct">${value}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${() => this._turnOff(input, zoneStates)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `;
  }

  private _commitMaster(input: InputConfig, zoneStates: HassEntity[], value: number): void {
    const calls = masterDeltaCalls(zoneStates, value);
    const vol = { ...this._pendingVol };
    for (const c of calls) vol[c.data.entity_id as string] = Math.round((c.data.volume_level as number) * 100);
    this._pendingVol = vol;
    this._pendingMaster = { ...this._pendingMaster, [input.entity]: value };
    this._run(calls);
  }

  /** Turn the whole stream off: drop every zone, and stop it if it has transport. */
  private _turnOff(input: InputConfig, zoneStates: HassEntity[]): void {
    const pend = { ...(this._pendingMembers[input.entity] ?? {}) };
    for (const z of zoneStates) pend[z.entity_id] = false;
    this._pendingMembers = { ...this._pendingMembers, [input.entity]: pend };
    const calls: ServiceCall[] = zoneStates.map((z) => unjoinCall(z.entity_id));
    const src = this._src(input);
    if (src && sourceHasTransport(src)) {
      calls.push({ domain: "media_player", service: "media_stop", data: { entity_id: input.entity } });
    }
    this._run(calls);
    const next = { ...this._picked };
    delete next[input.entity];
    this._picked = next;
  }

  private _renderZoneRow(input: InputConfig, zone: HassEntity, locked = false) {
    const muted = !!zone.attributes.is_volume_muted;
    const value = this._volPct(zone.entity_id);
    if (locked) {
      // Joined to this source but outside the card's scope: show it (so you
      // know it's playing) but read-only — no volume/mute/remove here.
      return html`
        <div class="row locked" title="Outside this card's area — control it from its own card">
          <ha-icon class="lock" icon="mdi:lock-outline"></ha-icon>
          <span class="row-name">${friendlyName(this.hass, zone.entity_id)}</span>
          <input type="range" min="0" max="100" .value=${String(value)} disabled />
          <span class="pct">${value}%</span>
        </div>
      `;
    }
    return html`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${() => this._run(muteCall(zone.entity_id, !muted))}>
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${friendlyName(this.hass, zone.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @input=${(e: Event) => this._setVol(zone.entity_id, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => this._setVol(zone.entity_id, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pct">${value}%</span>
        <button class="icon-btn" title="Turn off this zone"
          @click=${() => this._setMember(input, zone.entity_id, false)}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `;
  }

  // --- add zones (reused from v1; joins to the selected input's source) -----

  private _renderAddZones(input: InputConfig) {
    if (!this._showAddZones) {
      return html`
        <button class="add-btn" @click=${() => (this._showAddZones = true)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;
    }
    const inSession = new Set(this._memberStates(input.entity).map((s) => s.entity_id));
    const onSource = zoneToSourceMap(this.hass, this._zoneCfg.sources);
    const groups = groupZones(this.hass, this._zoneCfg, discoverZoneIds(this.hass, this._zoneCfg));
    return html`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add zones</span>
          <button class="icon-btn" @click=${() => (this._showAddZones = false)}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${groups.map(
          (g) => html`
            <div class="picker-group">${g.label}</div>
            <div class="pick-grid">
              ${g.zones.map((zid) => {
                const checked = inSession.has(zid);
                const other = onSource[zid];
                const elsewhere = other && other !== input.entity;
                const pic = areaPictureForEntity(this.hass, zid);
                return html`
                  <button
                    class="pick-tile ${pic ? "has-image" : ""} ${checked ? "selected" : ""}"
                    style=${pic ? `background-image: url("${pic}")` : ""}
                    @click=${() => this._setMember(input, zid, !checked)}
                  >
                    ${checked
                      ? html`<ha-icon class="pick-check" icon="mdi:check-circle"></ha-icon>`
                      : nothing}
                    <span class="pick-name">${friendlyName(this.hass, zid)}</span>
                    ${elsewhere
                      ? html`<span class="pick-other">on ${friendlyName(this.hass, other)}</span>`
                      : nothing}
                  </button>
                `;
              })}
            </div>
          `
        )}
      </div>
    `;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }

    /* The source + now-playing (or, while changing source, the picker) sub-card. */
    .subcard {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 12px;
      background: var(--secondary-background-color);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .subcard .sep {
      height: 1px;
      background: var(--divider-color);
      margin: 2px 0;
    }

    .rail {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .tile {
      flex: 0 0 auto;
      width: 110px;
      text-align: left;
      padding: 8px 10px;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .tile.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .tile-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--primary-color);
    }
    .tile-headline {
      font-weight: 600;
      line-height: 1.15;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .tile-sub {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tile-state {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
      text-transform: capitalize;
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--success-color, #2e7d32);
    }

    .content-slot {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .slot-icon { color: var(--primary-color); --mdc-icon-size: 28px; }
    .change-btn {
      flex: 0 0 auto;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: none;
      color: var(--primary-color);
      cursor: pointer;
    }
    .hint { font-size: 0.8rem; color: var(--secondary-text-color); }

    .now-playing { display: flex; align-items: center; gap: 12px; }
    .art {
      width: 56px; height: 56px; border-radius: 8px; overflow: hidden;
      flex: 0 0 auto; background: var(--secondary-background-color);
      display: flex; align-items: center; justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img { width: 100%; height: 100%; object-fit: cover; }
    .meta { flex: 1 1 auto; min-width: 0; }
    .title {
      font-weight: 500; color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .artist {
      color: var(--secondary-text-color); font-size: 0.85rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .transport { display: flex; align-items: center; gap: 4px; }
    .note { color: var(--secondary-text-color); font-size: 0.9rem; padding: 4px 0; }

    /* Add-zones picker tiles — responsive grid (2-up on phones, 3-up wider),
       with the zone's HA Area picture as the tile background. Tap to toggle. */
    .pick-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 8px;
      margin: 4px 0 8px;
    }
    .pick-tile {
      position: relative;
      min-height: 64px;
      padding: 8px 10px;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      background-size: cover;
      background-position: center;
      color: var(--primary-text-color);
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 2px;
    }
    .pick-tile.has-image { color: #fff; border-color: transparent; }
    .pick-tile.has-image::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 100%);
    }
    .pick-tile > * { position: relative; z-index: 1; }
    .pick-tile.selected { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .pick-check {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 2;
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .pick-tile.has-image .pick-check { color: #fff; }
    .pick-name { font-weight: 600; line-height: 1.15; }
    .pick-other { font-size: 0.72rem; opacity: 0.85; }

    .row { display: flex; align-items: center; gap: 8px; }
    .row.locked { opacity: 0.55; }
    /* Match .icon-btn footprint so the slider still left-aligns with other rows. */
    .row .lock {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 4px; --mdc-icon-size: 22px; color: var(--secondary-text-color);
    }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px; font-weight: 500;
    }
    /* Fixed width so every slider left-aligns -> relative volume at a glance. */
    .row-name {
      flex: 0 0 104px; width: 104px;
      color: var(--primary-text-color);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    input[type="range"] { flex: 1 1 auto; accent-color: var(--primary-color); }
    .pct {
      flex: 0 0 auto; width: 40px; text-align: right;
      color: var(--secondary-text-color); font-variant-numeric: tabular-nums;
    }
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      background: none; border: none; color: var(--primary-text-color);
      cursor: pointer; padding: 4px; --mdc-icon-size: 22px;
    }
    .icon-btn.big { --mdc-icon-size: 30px; color: var(--primary-color); }
    .add-btn {
      align-self: flex-start;
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 12px; border-radius: 8px;
      border: 1px dashed var(--divider-color);
      background: none; color: var(--primary-color); cursor: pointer;
    }
    .picker { display: flex; flex-direction: column; }
    .now-playing.idle .art, .now-playing.idle .meta { opacity: 0.55; }
    .picker-head {
      display: flex; align-items: center; gap: 6px;
      font-weight: 500; color: var(--primary-text-color);
    }
    .picker-title {
      flex: 1 1 auto; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .picker-floor {
      margin-top: 10px; font-weight: 600; color: var(--primary-text-color);
    }
    .picker-group {
      margin-top: 8px; font-size: 0.8rem; text-transform: uppercase;
      letter-spacing: 0.05em; color: var(--secondary-text-color);
    }
    .picker-row, .preset-row {
      display: flex; align-items: center; gap: 8px; padding: 6px 0;
      color: var(--primary-text-color); cursor: pointer;
      background: none; border: none; width: 100%; text-align: left;
      font-size: 1rem;
    }
    .preset-row span { flex: 1 1 auto; min-width: 0;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .preset-row.selected { color: var(--primary-color); }
    .preset-row.clear {
      margin-top: 4px; border-top: 1px solid var(--divider-color);
      padding-top: 10px; color: var(--error-color, #db4437);
    }
    .preset-row .chev { color: var(--secondary-text-color); flex: 0 0 auto; }
    .thumb { width: 32px; height: 32px; border-radius: 4px; object-fit: cover; flex: 0 0 auto; }
    .on-other {
      margin-left: auto; font-size: 0.8rem; color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "binary-moip-card": BinaryMoipCard;
  }
}
