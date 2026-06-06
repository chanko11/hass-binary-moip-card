import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  HassEntity,
  HomeAssistant,
  ServiceCall,
  SourceCardConfig,
} from "./types";
import {
  averageVolumePct,
  discoverZoneIds,
  friendlyName,
  groupZones,
  isSourceActive,
  joinCall,
  masterDeltaCalls,
  muteCall,
  pct,
  sessionZoneIds,
  sourceHasTransport,
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "./logic";

const VERSION = "0.1.0";
/* eslint-disable no-console */
console.info(
  `%c binary-moip-source-card %c ${VERSION} `,
  "color:#fff;background:#3399ff;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#3399ff;background:#222;border-radius:0 3px 3px 0;padding:2px 4px"
);

// Register in the "Add card" picker.
(window as unknown as { customCards?: unknown[] }).customCards = [
  ...((window as unknown as { customCards?: unknown[] }).customCards ?? []),
  {
    type: "binary-moip-source-card",
    name: "Binary MoIP Source Session",
    description:
      "Source-first whole-home audio: pick a source, control its session and zones.",
  },
];

@customElement("binary-moip-source-card")
export class BinaryMoipSourceCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: SourceCardConfig;
  @state() private _selected?: string;
  @state() private _showPicker = false;

  public setConfig(config: SourceCardConfig): void {
    if (!config || !Array.isArray(config.sources) || config.sources.length === 0) {
      throw new Error("binary-moip-source-card: `sources` (a non-empty list) is required");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 5;
  }

  public static getStubConfig(): Partial<SourceCardConfig> {
    return { type: "custom:binary-moip-source-card", sources: [] };
  }

  /** Currently selected source: the chosen one if still valid, else the first available. */
  private get _selectedSourceId(): string | undefined {
    const avail = this._config.sources.filter((id) => this.hass.states[id]);
    if (this._selected && avail.includes(this._selected)) return this._selected;
    return avail[0];
  }

  private async _run(calls: ServiceCall | ServiceCall[]): Promise<void> {
    const list = Array.isArray(calls) ? calls : [calls];
    await Promise.all(
      list.map((c) => this.hass.callService(c.domain, c.service, c.data))
    );
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    const selectedId = this._selectedSourceId;
    const source = selectedId ? this.hass.states[selectedId] : undefined;
    const zoneIds = sessionZoneIds(source);
    const zoneStates = zoneIds
      .map((id) => this.hass.states[id])
      .filter((s): s is HassEntity => !!s);

    return html`
      <ha-card>
        ${this._config.title ? html`<h1 class="card-header">${this._config.title}</h1>` : nothing}
        <div class="content">
          ${this._renderChips(selectedId)}
          ${source ? this._renderNowPlaying(source) : html`<div class="note">No source available</div>`}
          ${zoneStates.length ? this._renderMaster(zoneStates) : nothing}
          ${zoneStates.map((z) => this._renderZoneRow(z))}
          ${source ? this._renderAddZones(source) : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderChips(selectedId: string | undefined) {
    return html`
      <div class="chips">
        ${this._config.sources.map((id) => {
          const s = this.hass.states[id];
          if (!s) return nothing;
          const active = isSourceActive(s);
          return html`
            <button
              class="chip ${id === selectedId ? "selected" : ""}"
              @click=${() => (this._selected = id)}
            >
              ${active ? html`<span class="dot"></span>` : nothing}
              ${friendlyName(this.hass, id)}
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderNowPlaying(source: HassEntity) {
    const name = friendlyName(this.hass, source.entity_id);
    if (!sourceHasTransport(source)) {
      return html`<div class="note">${name} — no transport</div>`;
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
          <div class="title">${a.media_title ?? name}</div>
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

  private _renderMaster(zoneStates: HassEntity[]) {
    const value = averageVolumePct(zoneStates);
    return html`
      <div class="row master">
        <ha-icon icon="mdi:speaker-multiple"></ha-icon>
        <span class="row-name">All zones</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(value)}
          @change=${(e: Event) =>
            this._run(masterDeltaCalls(zoneStates, Number((e.target as HTMLInputElement).value)))}
        />
        <span class="pct">${value}%</span>
      </div>
    `;
  }

  private _renderZoneRow(zone: HassEntity) {
    const muted = !!zone.attributes.is_volume_muted;
    const value = pct(zone.attributes.volume_level);
    return html`
      <div class="row">
        <button
          class="icon-btn"
          title="Mute"
          @click=${() => this._run(muteCall(zone.entity_id, !muted))}
        >
          <ha-icon icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}></ha-icon>
        </button>
        <span class="row-name">${friendlyName(this.hass, zone.entity_id)}</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(value)}
          @change=${(e: Event) =>
            this._run(volumeSetCall(zone.entity_id, Number((e.target as HTMLInputElement).value) / 100))}
        />
        <span class="pct">${value}%</span>
        <button
          class="icon-btn"
          title="Remove from session"
          @click=${() => this._run(unjoinCall(zone.entity_id))}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderAddZones(source: HassEntity) {
    if (!this._showPicker) {
      return html`
        <button class="add-btn" @click=${() => (this._showPicker = true)}>
          <ha-icon icon="mdi:plus"></ha-icon> Add zones
        </button>
      `;
    }
    const inSession = new Set(sessionZoneIds(source));
    const onSource = zoneToSourceMap(this.hass, this._config.sources);
    const zoneIds = discoverZoneIds(this.hass, this._config);
    const groups = groupZones(this.hass, this._config, zoneIds);

    return html`
      <div class="picker">
        <div class="picker-head">
          <span>Add zones</span>
          <button class="icon-btn" @click=${() => (this._showPicker = false)}>
            <ha-icon icon="mdi:check"></ha-icon>
          </button>
        </div>
        ${groups.map(
          (g) => html`
            <div class="picker-group">${g.label}</div>
            ${g.zones.map((zid) => {
              const checked = inSession.has(zid);
              const other = onSource[zid];
              const elsewhere = other && other !== source.entity_id;
              return html`
                <label class="picker-row">
                  <input
                    type="checkbox"
                    .checked=${checked}
                    @change=${() =>
                      this._run(
                        checked ? unjoinCall(zid) : joinCall(source.entity_id, zid)
                      )}
                  />
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
    ha-card {
      overflow: hidden;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 16px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 0.9rem;
      cursor: pointer;
    }
    .chip.selected {
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 16%, transparent);
      color: var(--primary-color);
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success-color, #2e7d32);
    }
    .now-playing {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .art {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      overflow: hidden;
      flex: 0 0 auto;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .meta {
      flex: 1 1 auto;
      min-width: 0;
    }
    .title {
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .artist {
      color: var(--secondary-text-color);
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .transport {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .note {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      padding: 4px 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row.master {
      border-top: 1px solid var(--divider-color);
      padding-top: 12px;
      font-weight: 500;
    }
    .row-name {
      flex: 0 0 auto;
      min-width: 84px;
      color: var(--primary-text-color);
    }
    input[type="range"] {
      flex: 1 1 auto;
      accent-color: var(--primary-color);
    }
    .pct {
      flex: 0 0 auto;
      width: 40px;
      text-align: right;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: var(--primary-text-color);
      cursor: pointer;
      padding: 4px;
      --mdc-icon-size: 22px;
    }
    .icon-btn.big {
      --mdc-icon-size: 30px;
      color: var(--primary-color);
    }
    .add-btn {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px dashed var(--divider-color);
      background: none;
      color: var(--primary-color);
      cursor: pointer;
    }
    .picker {
      border-top: 1px solid var(--divider-color);
      padding-top: 8px;
    }
    .picker-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .picker-group {
      margin-top: 8px;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .on-other {
      margin-left: auto;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "binary-moip-source-card": BinaryMoipSourceCard;
  }
}
