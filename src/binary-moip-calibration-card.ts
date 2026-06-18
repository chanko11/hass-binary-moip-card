import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  CalibrationCardConfig,
  HomeAssistant,
  ServiceCall,
  WsSpace,
  WsZone,
} from "./types";
import {
  calibrationPlayCall,
  clearAnchorCall,
  pct,
  setAnchorCall,
  spaceDeactivateCall,
  spacesWsMsg,
  volumeSetCall,
} from "./logic";

const LEVELS = ["background", "listening", "party"] as const;
type Level = (typeof LEVELS)[number];

(window as unknown as { customCards?: unknown[] }).customCards = [
  ...((window as unknown as { customCards?: unknown[] }).customCards ?? []),
  {
    type: "binary-moip-calibration-card",
    name: "Binary MoIP Calibration",
    description:
      "Walk-around calibration for Listening Spaces: set a reference by music, match the rest by SPL with pink noise.",
  },
];

@customElement("binary-moip-calibration-card")
export class BinaryMoipCalibrationCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CalibrationCardConfig;
  @state() private _spaces: WsSpace[] = [];
  @state() private _spaceId?: string;
  @state() private _level: Level = "background";
  @state() private _refZone?: number; // reference zone group_id
  @state() private _refSpl = ""; // typed SPL target (UI-only)
  @state() private _error: string | null = null;
  @state() private _pendingVol: Record<string, number> = {}; // entity_id -> pct
  private _fetched = false;

  public setConfig(config: CalibrationCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 8;
  }

  public static getStubConfig(): CalibrationCardConfig {
    return { type: "custom:binary-moip-calibration-card" };
  }

  protected override updated(): void {
    // First time we have hass, load the spaces.
    if (this.hass && !this._fetched) {
      this._fetched = true;
      void this._fetchSpaces();
    }
    // Drop optimistic volume once hass reflects it.
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
      if (!this._spaceId && this._spaces.length) this._spaceId = this._spaces[0].id;
    } catch {
      this._error = "Couldn't read Listening Spaces from the integration.";
    }
  }

  private async _run(call: ServiceCall): Promise<void> {
    await this.hass.callService(call.domain, call.service, call.data);
  }

  private get _space(): WsSpace | undefined {
    return this._spaces.find((s) => s.id === this._spaceId);
  }

  // --- actions --------------------------------------------------------------

  private _playMusic(): void {
    if (!this._spaceId) return;
    void this._run(
      calibrationPlayCall(this._spaceId, {
        refType: "sample",
        source: this._config.source,
        level: this._level,
        setLevels: true,
      })
    );
  }

  private _playPink(): void {
    if (!this._spaceId) return;
    // Keep the volumes you've dialed in; just swap the audio to pink.
    void this._run(
      calibrationPlayCall(this._spaceId, { refType: "pink", setLevels: false })
    );
  }

  private async _stop(): Promise<void> {
    if (!this._spaceId) return;
    await this._run(spaceDeactivateCall(this._spaceId));
  }

  private _volPct(entityId: string): number {
    return this._pendingVol[entityId] ?? pct(this.hass.states[entityId]?.attributes.volume_level);
  }

  private _setVol(entityId: string, value: number, commit: boolean): void {
    this._pendingVol = { ...this._pendingVol, [entityId]: value };
    if (commit) void this._run(volumeSetCall(entityId, value / 100));
  }

  private async _save(zone: WsZone): Promise<void> {
    if (!this._spaceId) return;
    await this._run(setAnchorCall(this._spaceId, zone.group_id, this._level));
    await this._fetchSpaces(); // refresh anchors/badges
  }

  private async _clear(zone: WsZone): Promise<void> {
    if (!this._spaceId) return;
    await this._run(clearAnchorCall(this._spaceId, zone.group_id, this._level));
    await this._fetchSpaces();
  }

  // --- render ---------------------------------------------------------------

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const space = this._space;
    return html`
      <ha-card>
        <h1 class="card-header">${this._config.title ?? "Calibrate Listening Spaces"}</h1>
        <div class="content">
          ${this._error ? html`<div class="note">${this._error}</div>` : nothing}
          ${this._renderSpacePicker()}
          ${space ? this._renderSpace(space) : html`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`}
        </div>
      </ha-card>
    `;
  }

  private _renderSpacePicker() {
    if (!this._spaces.length) return nothing;
    return html`
      <div class="chips">
        ${this._spaces.map(
          (s) => html`
            <button
              class="chip ${s.id === this._spaceId ? "on" : ""}"
              @click=${() => {
                this._spaceId = s.id;
                this._refZone = undefined;
              }}
            >
              ${s.name}
              ${s.zones.every((z) => z.calibrated) && s.zones.length
                ? html`<ha-icon icon="mdi:check-circle"></ha-icon>`
                : nothing}
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderSpace(space: WsSpace) {
    return html`
      <div class="seg">
        ${LEVELS.map(
          (lvl) => html`
            <button class="seg-btn ${lvl === this._level ? "on" : ""}" @click=${() => (this._level = lvl)}>
              ${lvl}
            </button>
          `
        )}
      </div>

      <div class="audio">
        <button class="btn" @click=${this._playMusic}>
          <ha-icon icon="mdi:music"></ha-icon> Music
        </button>
        <button class="btn" @click=${this._playPink}>
          <ha-icon icon="mdi:waveform"></ha-icon> Pink noise
        </button>
        <button class="btn ghost" @click=${this._stop}>
          <ha-icon icon="mdi:stop"></ha-icon> Stop
        </button>
      </div>

      <div class="spl">
        <label>Reference SPL (your meter reading)</label>
        <input
          type="number"
          inputmode="decimal"
          .value=${this._refSpl}
          placeholder="e.g. 72"
          @input=${(e: Event) => (this._refSpl = (e.target as HTMLInputElement).value)}
        />
        <span class="unit">dB</span>
      </div>
      <div class="hint">
        Pick the reference zone, set it with <b>Music</b>, switch to <b>Pink noise</b>,
        read your meter into the box above — then match each room to that SPL and
        <b>Save</b>.
      </div>

      ${space.zones.map((z) => this._renderZone(z))}
    `;
  }

  private _renderZone(z: WsZone) {
    const isRef = this._refZone === z.group_id;
    const eid = z.entity_id;
    const value = eid ? this._volPct(eid) : 0;
    const anchor = z.anchors[this._level];
    return html`
      <div class="zone ${isRef ? "ref" : ""}">
        <div class="zhead">
          <button
            class="refbtn ${isRef ? "on" : ""}"
            title="Set as reference zone"
            @click=${() => (this._refZone = z.group_id)}
          >
            <ha-icon icon=${isRef ? "mdi:target" : "mdi:target-variant"}></ha-icon>
          </button>
          <span class="zname">${z.name}</span>
          <span class="anchor ${anchor == null ? "uncal" : ""}">
            ${anchor == null ? "uncalibrated" : `${this._level}: ${Math.round(anchor)}`}
          </span>
        </div>
        <div class="zctl">
          <input
            type="range" min="0" max="100" .value=${String(value)}
            ?disabled=${!eid}
            @input=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), false)}
            @change=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), true)}
          />
          <span class="pctv">${value}%</span>
          <button class="save" title="Save this level" @click=${() => this._save(z)}>
            <ha-icon icon="mdi:content-save"></ha-icon>
          </button>
          ${anchor == null
            ? nothing
            : html`<button class="save ghost" title="Clear" @click=${() => this._clear(z)}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>`}
        </div>
      </div>
    `;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note { color: var(--secondary-text-color); }
    .hint { color: var(--secondary-text-color); font-size: 0.85rem; }

    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 6px 12px; border-radius: 16px; cursor: pointer;
      border: 1px solid var(--divider-color); background: none;
      color: var(--primary-text-color); font-size: 0.95rem;
    }
    .chip.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .chip ha-icon { --mdc-icon-size: 16px; }

    .seg { display: flex; gap: 0; border: 1px solid var(--divider-color); border-radius: 10px; overflow: hidden; }
    .seg-btn {
      flex: 1; padding: 8px; background: none; border: none; cursor: pointer;
      color: var(--primary-text-color); text-transform: capitalize;
      border-right: 1px solid var(--divider-color);
    }
    .seg-btn:last-child { border-right: none; }
    .seg-btn.on { background: var(--primary-color); color: #fff; }

    .audio { display: flex; gap: 8px; }
    .btn {
      flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
      padding: 8px; border-radius: 8px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer;
    }
    .btn.ghost { color: var(--secondary-text-color); }

    .spl { display: flex; align-items: center; gap: 8px; }
    .spl label { flex: 1; color: var(--secondary-text-color); font-size: 0.9rem; }
    .spl input { width: 80px; padding: 6px; }
    .spl .unit { color: var(--secondary-text-color); }

    .zone { border-top: 1px solid var(--divider-color); padding-top: 8px; display: flex; flex-direction: column; gap: 6px; }
    .zone.ref { background: color-mix(in srgb, var(--primary-color) 8%, transparent); border-radius: 8px; padding: 8px; }
    .zhead { display: flex; align-items: center; gap: 8px; }
    .refbtn { background: none; border: none; cursor: pointer; color: var(--secondary-text-color); padding: 2px; }
    .refbtn.on { color: var(--primary-color); }
    .zname { flex: 1; font-weight: 600; }
    .anchor { font-size: 0.82rem; color: var(--primary-text-color); }
    .anchor.uncal { color: var(--warning-color, #e0a030); }
    .zctl { display: flex; align-items: center; gap: 8px; }
    .zctl input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 38px; text-align: right; font-variant-numeric: tabular-nums; }
    .save { background: none; border: none; cursor: pointer; color: var(--primary-color); padding: 4px; }
    .save.ghost { color: var(--secondary-text-color); }
    input[type="range"] { accent-color: var(--primary-color); }
  `;
}
