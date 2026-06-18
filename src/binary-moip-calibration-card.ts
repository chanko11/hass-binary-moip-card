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
  muteCall,
  pct,
  setAnchorCall,
  spaceDeactivateCall,
  spacesWsMsg,
  volumeSetCall,
} from "./logic";

const LEVELS = ["background", "listening", "party"] as const;
type Level = (typeof LEVELS)[number];
type Stage = "space" | "level" | "ref" | "walk";

(window as unknown as { customCards?: unknown[] }).customCards = [
  ...((window as unknown as { customCards?: unknown[] }).customCards ?? []),
  {
    type: "binary-moip-calibration-card",
    name: "Binary MoIP Calibration",
    description:
      "Guided walk-around calibration for Listening Spaces — one room at a time, match by SPL.",
  },
];

@customElement("binary-moip-calibration-card")
export class BinaryMoipCalibrationCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CalibrationCardConfig;
  @state() private _spaces: WsSpace[] = [];
  @state() private _error: string | null = null;
  // wizard state
  @state() private _stage: Stage = "space";
  @state() private _spaceId?: string;
  @state() private _level: Level = "listening";
  @state() private _refZone?: number;
  @state() private _walkIdx = 0;
  @state() private _mode: "music" | "pink" = "music";
  @state() private _refSpl = "";
  @state() private _pendingVol: Record<string, number> = {};
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

  private _run(call: ServiceCall): Promise<unknown> {
    return this.hass.callService(call.domain, call.service, call.data);
  }

  private get _space(): WsSpace | undefined {
    return this._spaces.find((s) => s.id === this._spaceId);
  }

  /** Zones in walk order: the reference first, then the rest in Space order. */
  private get _walkZones(): WsZone[] {
    const space = this._space;
    if (!space) return [];
    const ref = space.zones.find((z) => z.group_id === this._refZone);
    const rest = space.zones.filter((z) => z.group_id !== this._refZone);
    return ref ? [ref, ...rest] : rest;
  }

  private get _current(): WsZone | undefined {
    return this._walkZones[this._walkIdx];
  }

  // --- solo: only the current zone plays (others muted) ---------------------

  private _solo(currentEid: string | null | undefined): void {
    const space = this._space;
    if (!space) return;
    for (const z of space.zones) {
      if (z.entity_id) void this._run(muteCall(z.entity_id, z.entity_id !== currentEid));
    }
  }

  private _unmuteAll(): void {
    for (const z of this._space?.zones ?? []) {
      if (z.entity_id) void this._run(muteCall(z.entity_id, false));
    }
  }

  // --- wizard navigation ----------------------------------------------------

  private _pickSpace(id: string): void {
    this._spaceId = id;
    this._stage = "level";
  }
  private _pickLevel(l: Level): void {
    this._level = l;
    this._stage = "ref";
  }
  private async _pickRef(gid: number): Promise<void> {
    this._refZone = gid;
    this._walkIdx = 0;
    this._mode = "music";
    this._stage = "walk";
    // Route + working baseline for the whole space, then solo the reference.
    await this._run(
      calibrationPlayCall(this._spaceId!, {
        refType: "sample",
        source: this._config.source,
        level: this._level,
        setLevels: true,
      })
    );
    this._solo(this._current?.entity_id);
  }

  private async _toMode(mode: "music" | "pink"): Promise<void> {
    this._mode = mode;
    await this._run(
      calibrationPlayCall(this._spaceId!, { refType: mode === "pink" ? "pink" : "sample", setLevels: false })
    );
  }

  private async _goZone(idx: number): Promise<void> {
    if (idx < 0 || idx >= this._walkZones.length) return;
    // Leaving the reference (music) -> everything else is matched on pink.
    if (this._walkIdx === 0 && idx > 0 && this._mode === "music") {
      await this._toMode("pink");
    }
    this._walkIdx = idx;
    this._solo(this._current?.entity_id);
  }

  private async _finish(): Promise<void> {
    this._unmuteAll();
    if (this._spaceId) await this._run(spaceDeactivateCall(this._spaceId)); // stop calibration audio
    this._stage = "space";
    this._walkIdx = 0;
    this._refZone = undefined;
    await this._fetchSpaces();
  }

  // --- volume + save --------------------------------------------------------

  private _volPct(entityId: string): number {
    return this._pendingVol[entityId] ?? pct(this.hass.states[entityId]?.attributes.volume_level);
  }
  private _setVol(entityId: string, value: number, commit: boolean): void {
    this._pendingVol = { ...this._pendingVol, [entityId]: value };
    if (commit) void this._run(volumeSetCall(entityId, value / 100));
  }
  private async _save(z: WsZone): Promise<void> {
    await this._run(setAnchorCall(this._spaceId!, z.group_id, this._level));
    await this._fetchSpaces();
  }

  // --- render ---------------------------------------------------------------

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-card>
        <h1 class="card-header">${this._config.title ?? "Calibrate"}</h1>
        <div class="content">
          ${this._error ? html`<div class="note">${this._error}</div>` : nothing}
          ${this._renderStage()}
        </div>
      </ha-card>
    `;
  }

  private _renderStage() {
    switch (this._stage) {
      case "space":
        return this._renderPickSpace();
      case "level":
        return this._renderPickLevel();
      case "ref":
        return this._renderPickRef();
      case "walk":
        return this._renderWalk();
    }
  }

  private _step(n: number, label: string) {
    return html`<div class="steps">Step ${n}/4 · ${label}</div>`;
  }

  private _renderPickSpace() {
    if (!this._spaces.length)
      return html`<div class="note">No Listening Spaces yet — create one in the integration options.</div>`;
    return html`
      ${this._step(1, "Pick a Space")}
      <div class="list">
        ${this._spaces.map(
          (s) => html`
            <button class="row-btn" @click=${() => this._pickSpace(s.id)}>
              <span>${s.name}</span>
              ${s.zones.length && s.zones.every((z) => z.calibrated)
                ? html`<ha-icon class="ok" icon="mdi:check-circle"></ha-icon>`
                : html`<span class="muted">${s.zones.filter((z) => z.calibrated).length}/${s.zones.length}</span>`}
              <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderPickLevel() {
    return html`
      <button class="back" @click=${() => (this._stage = "space")}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._space?.name}</button>
      ${this._step(2, "Pick a Level")}
      <div class="list">
        ${LEVELS.map(
          (l) => html`<button class="row-btn lvl" @click=${() => this._pickLevel(l)}>
            <span>${l}</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>
    `;
  }

  private _renderPickRef() {
    return html`
      <button class="back" @click=${() => (this._stage = "level")}><ha-icon icon="mdi:chevron-left"></ha-icon> ${this._level}</button>
      ${this._step(3, "Pick the reference zone")}
      <div class="hint">Choose your most prominent listening position.</div>
      <div class="list">
        ${(this._space?.zones ?? []).map(
          (z) => html`<button class="row-btn" @click=${() => this._pickRef(z.group_id)}>
            <ha-icon icon="mdi:target"></ha-icon><span>${z.name}</span>
            <ha-icon class="chev" icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>
    `;
  }

  private _renderWalk() {
    const z = this._current;
    if (!z) return nothing;
    const n = this._walkZones.length;
    const isRef = this._walkIdx === 0;
    const eid = z.entity_id;
    const value = eid ? this._volPct(eid) : 0;
    const anchor = z.anchors[this._level];
    return html`
      <button class="back" @click=${() => (this._stage = "ref")}><ha-icon icon="mdi:chevron-left"></ha-icon> change reference</button>
      <div class="steps">${this._space?.name} · ${this._level} · zone ${this._walkIdx + 1}/${n}</div>

      <div class="zonebig ${isRef ? "ref" : ""}">
        <ha-icon icon=${isRef ? "mdi:target" : "mdi:speaker"}></ha-icon>
        <div class="zb-name">${z.name}${isRef ? html` <span class="tag">reference</span>` : nothing}</div>
        <div class="zb-sub">only this room is playing${anchor != null ? ` · saved ${Math.round(anchor)}` : ""}</div>
      </div>

      ${isRef
        ? html`<div class="audio">
            <button class="btn ${this._mode === "music" ? "on" : ""}" @click=${() => this._toMode("music")}>
              <ha-icon icon="mdi:music"></ha-icon> Music
            </button>
            <button class="btn ${this._mode === "pink" ? "on" : ""}" @click=${() => this._toMode("pink")}>
              <ha-icon icon="mdi:waveform"></ha-icon> Pink
            </button>
          </div>
          <div class="hint">Set a comfortable ${this._level} level with music, Save it, then switch to Pink and note the SPL on your meter app.</div>`
        : html`<div class="hint">Pink noise is playing. Adjust until your meter reads the target SPL, then Save.</div>`}

      <div class="spl">
        <label>${isRef ? "Reference SPL" : "Target SPL"}</label>
        <input type="number" inputmode="decimal" .value=${this._refSpl}
          placeholder="e.g. 72"
          @input=${(e: Event) => (this._refSpl = (e.target as HTMLInputElement).value)} />
        <span class="unit">dB</span>
      </div>

      <div class="vol">
        <input type="range" min="0" max="100" .value=${String(value)} ?disabled=${!eid}
          @input=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), false)}
          @change=${(e: Event) => eid && this._setVol(eid, Number((e.target as HTMLInputElement).value), true)} />
        <span class="pctv">${value}%</span>
      </div>

      <button class="save-big" @click=${() => this._save(z)}>
        <ha-icon icon="mdi:content-save"></ha-icon> ${isRef ? "Save as reference" : "Save"}
      </button>

      <div class="nav">
        <button class="btn ghost" ?disabled=${this._walkIdx === 0} @click=${() => this._goZone(this._walkIdx - 1)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon> Prev
        </button>
        ${this._walkIdx < n - 1
          ? html`<button class="btn" @click=${() => this._goZone(this._walkIdx + 1)}>Next <ha-icon icon="mdi:chevron-right"></ha-icon></button>`
          : html`<button class="btn on" @click=${this._finish}><ha-icon icon="mdi:check"></ha-icon> Finish</button>`}
      </div>
    `;
  }

  static override styles = css`
    ha-card { overflow: hidden; }
    .content { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
    .note { color: var(--secondary-text-color); }
    .hint { color: var(--secondary-text-color); font-size: 0.85rem; }
    .steps { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary-text-color); }
    .back { align-self: flex-start; display: inline-flex; align-items: center; gap: 2px; background: none; border: none; color: var(--primary-color); cursor: pointer; padding: 0; }

    .list { display: flex; flex-direction: column; gap: 8px; }
    .row-btn {
      display: flex; align-items: center; gap: 10px; width: 100%;
      padding: 12px; border-radius: 10px; border: 1px solid var(--divider-color);
      background: none; color: var(--primary-text-color); cursor: pointer; font-size: 1rem;
    }
    .row-btn span { flex: 1; text-align: left; text-transform: capitalize; }
    .row-btn .chev { color: var(--secondary-text-color); }
    .row-btn .ok { color: var(--primary-color); }
    .muted { color: var(--secondary-text-color); font-size: 0.85rem; }

    .zonebig { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px; border-radius: 12px; background: var(--secondary-background-color); }
    .zonebig.ref { background: color-mix(in srgb, var(--primary-color) 12%, transparent); }
    .zonebig ha-icon { --mdc-icon-size: 36px; color: var(--primary-color); }
    .zb-name { font-size: 1.2rem; font-weight: 600; }
    .zb-name .tag { font-size: 0.7rem; background: var(--primary-color); color: #fff; border-radius: 4px; padding: 1px 5px; vertical-align: middle; }
    .zb-sub { color: var(--secondary-text-color); font-size: 0.85rem; }

    .audio { display: flex; gap: 8px; }
    .btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border-radius: 8px; border: 1px solid var(--divider-color); background: none; color: var(--primary-text-color); cursor: pointer; }
    .btn.on { background: var(--primary-color); color: #fff; border-color: transparent; }
    .btn.ghost { color: var(--secondary-text-color); }
    .btn[disabled] { opacity: 0.4; cursor: default; }

    .spl { display: flex; align-items: center; gap: 8px; }
    .spl label { flex: 1; color: var(--secondary-text-color); }
    .spl input { width: 84px; padding: 8px; font-size: 1rem; }
    .spl .unit { color: var(--secondary-text-color); }

    .vol { display: flex; align-items: center; gap: 10px; }
    .vol input[type="range"] { flex: 1; min-width: 0; }
    .pctv { width: 42px; text-align: right; font-variant-numeric: tabular-nums; }

    .save-big { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 10px; border: none; background: var(--primary-color); color: #fff; cursor: pointer; font-size: 1rem; }
    .nav { display: flex; gap: 8px; }
    input[type="range"] { accent-color: var(--primary-color); }
  `;
}
