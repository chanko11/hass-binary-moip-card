import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "./logic";

const VERSION = "2.2.0";
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

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const input = this._selectedInput;
    const src = input ? this._src(input) : undefined;
    const zoneStates = sessionZoneIds(src)
      .map((id) => this.hass.states[id])
      .filter((s): s is HassEntity => !!s);

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
          ${input && zoneStates.length ? this._renderMaster(input, zoneStates) : nothing}
          ${zoneStates.map((z) => this._renderZoneRow(z))}
          ${input && src && zoneStates.length === 0
            ? html`<div class="note">No zones yet — add one below to hear this.</div>`
            : nothing}
          ${input && src ? this._renderAddZones(input, src) : nothing}
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
          <button class="change-btn" @click=${() => this._openChangeSource()}>
            Change source
          </button>
        </div>
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
      // sibling source list
      body = sources.map(
        (s, i) => html`
          <button class="preset-row" @click=${() => this._selectSource(input, i)}>
            <ha-icon icon=${s.icon ?? (s.type === "connect" ? "mdi:cast" : "mdi:music-box-multiple")}></ha-icon>
            <span>${s.label ?? (s.type === "connect" ? "Spotify Connect" : "Music Assistant")}</span>
            ${s.type === "connect"
              ? html`<span class="on-other">cast</span>`
              : html`<ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>`}
          </button>
        `
      );
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

  private _renderMaster(input: InputConfig, zoneStates: HassEntity[]) {
    const value = averageVolumePct(zoneStates);
    return html`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @change=${(e: Event) =>
            this._run(masterDeltaCalls(zoneStates, Number((e.target as HTMLInputElement).value)))} />
        <span class="pct">${value}%</span>
        <button class="icon-btn" title="Turn off — remove all zones"
          @click=${() => this._turnOff(input, zoneStates)}>
          <ha-icon icon="mdi:power"></ha-icon>
        </button>
      </div>
    `;
  }

  /** Turn the whole stream off: drop every zone, and stop it if it has transport. */
  private _turnOff(input: InputConfig, zoneStates: HassEntity[]): void {
    const calls: ServiceCall[] = zoneStates.map((z) => unjoinCall(z.entity_id));
    const src = this._src(input);
    if (src && sourceHasTransport(src)) {
      calls.push({
        domain: "media_player",
        service: "media_stop",
        data: { entity_id: input.entity },
      });
    }
    this._run(calls);
    const next = { ...this._picked };
    delete next[input.entity];
    this._picked = next;
  }

  private _renderZoneRow(zone: HassEntity) {
    const muted = !!zone.attributes.is_volume_muted;
    const value = pct(zone.attributes.volume_level);
    return html`
      <div class="row">
        <button class="icon-btn" title="Mute"
          @click=${() => this._run(muteCall(zone.entity_id, !muted))}>
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${friendlyName(this.hass, zone.entity_id)}</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @change=${(e: Event) =>
            this._run(volumeSetCall(zone.entity_id, Number((e.target as HTMLInputElement).value) / 100))} />
        <span class="pct">${value}%</span>
        <button class="icon-btn" title="Remove from session"
          @click=${() => this._run(unjoinCall(zone.entity_id))}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `;
  }

  // --- add zones (reused from v1; joins to the selected input's source) -----

  private _renderAddZones(input: InputConfig, src: HassEntity) {
    if (!this._showAddZones) {
      return html`
        <button class="add-btn" @click=${() => (this._showAddZones = true)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;
    }
    const inSession = new Set(sessionZoneIds(src));
    const onSource = zoneToSourceMap(this.hass, this._zoneCfg.sources);
    const groups = groupZones(this.hass, this._zoneCfg, discoverZoneIds(this.hass, this._zoneCfg));
    return html`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${() => (this._showAddZones = false)}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${groups.map(
          (g) => html`
            <div class="picker-group">${g.label}</div>
            ${g.zones.map((zid) => {
              const checked = inSession.has(zid);
              const other = onSource[zid];
              const elsewhere = other && other !== input.entity;
              return html`
                <label class="picker-row">
                  <input type="checkbox" .checked=${checked}
                    @change=${() =>
                      this._run(checked ? unjoinCall(zid) : joinCall(input.entity, zid))} />
                  <span>${friendlyName(this.hass, zid)}</span>
                  ${elsewhere
                    ? html`<span class="on-other">on ${friendlyName(this.hass, other)}</span>`
                    : nothing}
                </label>
              `;
            })}
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

    .row { display: flex; align-items: center; gap: 8px; }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px; font-weight: 500;
    }
    .row-name { flex: 0 0 auto; min-width: 84px; color: var(--primary-text-color); }
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
