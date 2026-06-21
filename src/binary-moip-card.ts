import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// Sibling elements shipped in the same bundle: calibration + Space-first playback.
import "./binary-moip-calibration-card";
import "./binary-moip-spaces-card";
import {
  BrowseNode,
  CardConfig,
  HassEntity,
  HomeAssistant,
  InputConfig,
  LibrarySource,
  ServiceCall,
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
  isSourceActive,
  muteCall,
  pct,
  playItemCall,
  sourceHasTransport,
  spaceActivateCall,
  spaceDeactivateCall,
  spaceSetLevelCall,
  spaceSetMasterCall,
  spacesWsMsg,
  zoneSetCall,
  transportCall,
  volumeSetCall,
} from "./logic";

const SPACE_LEVELS = ["background", "listening", "party"] as const;

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
  @state() private _showSourceVol = false;
  @state() private _spacesList: WsSpace[] = []; // session = Listening Spaces on this source
  @state() private _showAddSpaces = false;
  @state() private _expandedSpace: string | null = null;
  @state() private _pendingSpaceMaster: Record<string, number> = {}; // space id -> master
  private _spacesFetched = false;

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
    if (this.hass && !this._spacesFetched) {
      this._spacesFetched = true;
      this.hass
        .callWS<{ spaces: WsSpace[] }>(spacesWsMsg())
        .then((r) => (this._spacesList = r.spaces ?? []))
        .catch(() => undefined);
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

  /** Displayed volume % for an entity: optimistic value if pending, else live. */
  private _volPct(entityId: string): number {
    return this._pendingVol[entityId] ?? pct(this.hass.states[entityId]?.attributes.volume_level);
  }

  private _setVol(entityId: string, value: number, commit: boolean): void {
    this._pendingVol = { ...this._pendingVol, [entityId]: value };
    if (commit) this._run(volumeSetCall(entityId, value / 100));
  }

  // --- Listening Space session (the source-first card targets Spaces) --------

  private _inputName(entity: string | null | undefined): string | undefined {
    return this._config.inputs.find((i) => i.entity === entity)?.name;
  }
  private async _refreshSpaces(): Promise<void> {
    try {
      const r = await this.hass.callWS<{ spaces: WsSpace[] }>(spacesWsMsg());
      this._spacesList = r.spaces ?? [];
    } catch {
      /* leave prior list */
    }
  }
  private async _runSpace(call: ServiceCall): Promise<void> {
    await this._run(call);
    await this._refreshSpaces();
  }

  private _renderSpaceSession(input: InputConfig) {
    const active = this._spacesList.filter((s) => s.active && s.source === input.entity);
    return html`
      ${active.length
        ? active.map((s) => this._renderSpaceRow(s))
        : html`<div class="note">No listening spaces yet — add one below.</div>`}
      ${this._showAddSpaces
        ? this._renderAddSpaces(input)
        : html`<button class="add-btn" @click=${() => (this._showAddSpaces = true)}>
            <ha-icon icon="mdi:plus"></ha-icon> Add listening spaces
          </button>`}
    `;
  }

  private _renderSpaceRow(s: WsSpace) {
    const expanded = this._expandedSpace === s.id;
    const lbl = s.label ? this.hass.labels?.[s.label] : undefined;
    const accent = lbl?.color ? `--row-accent: var(--${lbl.color}-color);` : "";
    return html`
      <div class="sprow" style=${accent}>
        <div class="sprow-head">
          <ha-icon class="sp-icon" icon=${lbl?.icon || "mdi:speaker-multiple"}></ha-icon>
          <span class="sprow-name">${s.name}</span>
          <button class="icon-btn" title="Turn off" @click=${() => this._runSpace(spaceDeactivateCall(s.id))}>
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        <div class="presets">
          ${SPACE_LEVELS.map(
            (l) => html`<button class="preset ${s.level === l ? "on" : ""}"
              @click=${() => this._runSpace(spaceSetLevelCall(s.id, l))}>${l}</button>`
          )}
        </div>
        <button class="expand" @click=${() => (this._expandedSpace = expanded ? null : s.id)}>
          <ha-icon icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
          ${expanded ? "Hide" : "Fine control"}
        </button>
        ${expanded ? this._renderSpaceDetail(s) : nothing}
      </div>
    `;
  }

  private _renderSpaceDetail(s: WsSpace) {
    const master = this._pendingSpaceMaster[s.id] ?? (s.master != null ? Math.round(s.master) : 0);
    return html`
      <div class="row master">
        <ha-icon icon="mdi:volume-high"></ha-icon>
        <span class="row-name">Master</span>
        <input type="range" min="0" max="100" .value=${String(master)}
          @input=${(e: Event) =>
            (this._pendingSpaceMaster = {
              ...this._pendingSpaceMaster,
              [s.id]: Number((e.target as HTMLInputElement).value),
            })}
          @change=${async (e: Event) => {
            const v = Number((e.target as HTMLInputElement).value);
            await this._runSpace(spaceSetMasterCall(s.id, v));
            const m = { ...this._pendingSpaceMaster };
            delete m[s.id];
            this._pendingSpaceMaster = m;
          }} />
        <span class="pct">${master}%</span>
      </div>
      ${s.zones.map((z) => this._renderSpaceZone(s, z))}
    `;
  }

  private _renderSpaceZone(s: WsSpace, z: WsZone) {
    const eid = z.entity_id;
    const value = eid ? this._volPct(eid) : 0;
    const on = eid ? this.hass.states[eid]?.attributes.source !== "None" : false;
    const muted = eid ? !!this.hass.states[eid]?.attributes.is_volume_muted : false;
    return html`
      <div class="row">
        <button class="icon-btn" title=${on ? "Drop zone" : "Add zone"}
          @click=${() => this._runSpace(zoneSetCall(s.id, z.group_id, on ? "off" : "on"))}>
          <ha-icon icon=${on ? "mdi:speaker" : "mdi:speaker-off"}></ha-icon>
        </button>
        <span class="row-name">${z.name}</span>
        <button class="icon-btn" ?disabled=${!eid} title=${muted ? "Unmute" : "Mute"}
          @click=${() => eid && this._run(muteCall(eid, !muted))}>
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <input type="range" min="0" max="100" .value=${String(value)} ?disabled=${!eid}
          @input=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pct">${value}%</span>
      </div>
    `;
  }

  private _renderAddSpaces(input: InputConfig) {
    return html`
      <div class="picker">
        <div class="picker-head">
          <span class="picker-title">Add listening spaces</span>
          <button class="icon-btn" @click=${() => (this._showAddSpaces = false)}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${this._spacesList.map((s) => {
          const here = s.active && s.source === input.entity;
          const status = !s.active
            ? "idle"
            : s.source === input.entity
              ? "here"
              : "on " + (this._inputName(s.source) ?? "another source");
          const lbl = s.label ? this.hass.labels?.[s.label] : undefined;
          return html`<button class="preset-row" @click=${() =>
            here
              ? this._runSpace(spaceDeactivateCall(s.id))
              : this._runSpace(spaceActivateCall(s.id, { source: input.entity, level: s.level ?? "listening" }))}>
            <ha-icon icon=${lbl?.icon || "mdi:speaker-multiple"}></ha-icon>
            <span>${s.name}</span>
            <span class="on-other">${status}</span>
            ${here ? html`<ha-icon class="chev" icon="mdi:check-circle"></ha-icon>` : nothing}
          </button>`;
        })}
      </div>
    `;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const input = this._selectedInput;
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
          ${input ? this._renderSpaceSession(input) : nothing}
        </div>
      </ha-card>
    `;
  }

  // --- input rail -----------------------------------------------------------

  private _renderRail(selected: InputConfig | undefined) {
    return html`
      <div class="rail ha-scrollbar">
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
                this._showAddSpaces = false;
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

    /* Listening Space session rows (source-first card targets Spaces) */
    .sprow {
      --row-accent: var(--primary-color);
      border: 1px solid var(--divider-color); border-left: 3px solid var(--row-accent);
      border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px;
    }
    .sprow-head { display: flex; align-items: center; gap: 8px; }
    .sprow-head .sp-icon { color: var(--row-accent); }
    .sprow-name { flex: 1; font-weight: 600; }
    .presets { display: flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
    .preset { flex: 1; padding: 6px; background: none; border: none; border-right: 1px solid var(--divider-color); cursor: pointer; color: var(--primary-text-color); text-transform: capitalize; font-size: 0.9rem; }
    .preset:last-child { border-right: none; }
    .preset.on { background: var(--row-accent); color: #fff; }
    .expand { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; font-size: 0.9rem; }
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
    .space-chips { display: flex; flex-wrap: wrap; gap: 6px; }
    .space-chip {
      --chip-accent: var(--primary-color);
      display: inline-flex; align-items: center; gap: 4px; padding: 6px 10px;
      border-radius: 16px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer;
    }
    .space-chip.on { background: var(--chip-accent); color: #fff; border-color: transparent; }
    .space-chip ha-icon { --mdc-icon-size: 18px; }
    .space-chip .x { --mdc-icon-size: 16px; }
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
