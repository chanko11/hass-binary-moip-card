import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  CardConfig,
  HassEntity,
  HomeAssistant,
  InputConfig,
  ServiceCall,
} from "./types";
import {
  averageVolumePct,
  currentPresetIndex,
  discoverZoneIds,
  friendlyName,
  groupZones,
  isConnectPreset,
  isSourceActive,
  joinCall,
  masterDeltaCalls,
  muteCall,
  pct,
  playMediaCall,
  sessionZoneIds,
  sourceHasTransport,
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "./logic";

const VERSION = "2.0.0";
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

const PLAYING = new Set(["playing", "paused", "buffering", "on"]);

@customElement("binary-moip-card")
export class BinaryMoipCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _selected?: string;
  @state() private _showContent = false;
  @state() private _showAddZones = false;
  @state() private _connectHint: string | null = null;

  public setConfig(config: CardConfig): void {
    if (!config || !Array.isArray(config.inputs) || config.inputs.length === 0) {
      throw new Error("binary-moip-card: `inputs` (a non-empty list) is required");
    }
    for (const i of config.inputs) {
      if (!i.entity || !i.kind) {
        throw new Error("binary-moip-card: each input needs `entity` and `kind`");
      }
    }
    this._config = { ...config, content: config.content ?? [] };
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

  private _ma(input: InputConfig): HassEntity | undefined {
    return input.ma_player ? this.hass.states[input.ma_player] : undefined;
  }

  /** {zone_groups, sources} for the reused zone helpers (sources = all inputs). */
  private get _zoneCfg() {
    return {
      zone_groups: this._config.zone_groups,
      sources: this._config.inputs.map((i) => i.entity),
    };
  }

  /** Headline for a stream tile/slot: current content label, else track, else Idle. */
  private _streamContent(input: InputConfig): { label: string; icon: string } {
    const src = this._src(input);
    const presets = this._config.content ?? [];
    if (!src || !PLAYING.has(src.state)) {
      return { label: "Idle", icon: input.icon ?? "mdi:music" };
    }
    const idx = currentPresetIndex(this._ma(input), presets);
    if (idx >= 0) {
      const p = presets[idx];
      return { label: p.label, icon: p.icon ?? input.icon ?? "mdi:music" };
    }
    return {
      label: src.attributes.media_title || "Playing",
      icon: input.icon ?? "mdi:music",
    };
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
          ${input ? this._renderContentSlot(input) : html`<div class="note">No input available</div>`}
          ${input && input.kind === "stream" && this._showContent
            ? this._renderContentPicker(input)
            : nothing}
          ${zoneStates.length ? this._renderMaster(zoneStates) : nothing}
          ${zoneStates.map((z) => this._renderZoneRow(z))}
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
            ? this._streamContent(input).label
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
                this._showContent = false;
                this._showAddZones = false;
                this._connectHint = null;
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

  private _renderContentSlot(input: InputConfig) {
    const src = this._src(input);
    if (input.kind === "physical") {
      return html`
        <div class="content-slot">
          <ha-icon class="slot-icon" icon=${input.icon ?? "mdi:music-box-outline"}></ha-icon>
          <div class="meta">
            <div class="title">${input.name}</div>
            <div class="artist">Live input — control is at the source; no skip/pause.</div>
          </div>
        </div>
      `;
    }
    const content = this._streamContent(input);
    return html`
      <div class="content-slot">
        <ha-icon class="slot-icon" icon=${content.icon}></ha-icon>
        <div class="meta">
          <div class="title">${content.label}</div>
          <div class="artist">${input.name}</div>
        </div>
        <button
          class="change-btn"
          @click=${() => {
            this._showContent = !this._showContent;
            this._connectHint = null;
          }}
        >
          Change source
        </button>
      </div>
      <div class="hint">Switching the source keeps the same zones.</div>
      ${src ? this._renderNowPlaying(src) : nothing}
    `;
  }

  private _renderContentPicker(input: InputConfig) {
    const presets = this._config.content ?? [];
    const cur = currentPresetIndex(this._ma(input), presets);
    return html`
      <div class="picker">
        <div class="picker-head">
          <span>Change source — ${input.name}</span>
          <button class="icon-btn" @click=${() => (this._showContent = false)}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${presets.map((preset, i) => {
          const connect = isConnectPreset(preset);
          const icon =
            preset.icon ?? (connect ? "mdi:spotify" : "mdi:playlist-music");
          return html`
            <button
              class="preset-row ${i === cur ? "selected" : ""}"
              @click=${() => {
                if (connect) {
                  this._connectHint = `Cast from your Spotify app to ${input.name}.`;
                } else {
                  this._run(playMediaCall(input.ma_player, preset));
                  this._showContent = false;
                }
              }}
            >
              <ha-icon icon=${icon}></ha-icon>
              <span>${preset.label}</span>
              ${connect
                ? html`<span class="on-other">cast from app</span>`
                : nothing}
            </button>
          `;
        })}
        ${this._connectHint
          ? html`<div class="hint">${this._connectHint}</div>`
          : nothing}
      </div>
    `;
  }

  // --- now-playing + transport (reused from v1) -----------------------------

  private _renderNowPlaying(source: HassEntity) {
    if (!sourceHasTransport(source)) {
      return html`<div class="note">No transport for this input.</div>`;
    }
    const a = source.attributes;
    const playing = source.state === "playing";
    return html`
      <div class="now-playing">
        <div class="art">
          ${a.entity_picture
            ? html`<img src=${a.entity_picture} alt="" />`
            : html`<ha-icon icon="mdi:music"></ha-icon>`}
        </div>
        <div class="meta">
          <div class="title">${a.media_title ?? ""}</div>
          <div class="artist">${a.media_artist ?? ""}</div>
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

  private _renderMaster(zoneStates: HassEntity[]) {
    const value = averageVolumePct(zoneStates);
    return html`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input type="range" min="0" max="100" .value=${String(value)}
          @change=${(e: Event) =>
            this._run(masterDeltaCalls(zoneStates, Number((e.target as HTMLInputElement).value)))} />
        <span class="pct">${value}%</span>
      </div>
    `;
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    .picker { border-top: 1px solid var(--divider-color); padding-top: 8px; }
    .picker-head {
      display: flex; align-items: center; justify-content: space-between;
      font-weight: 500; color: var(--primary-text-color);
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
    .preset-row.selected { color: var(--primary-color); }
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
