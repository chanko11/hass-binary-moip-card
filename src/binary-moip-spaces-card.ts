import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import {
  HomeAssistant,
  InputConfig,
  ServiceCall,
  SpacesCardConfig,
  WsSpace,
  WsZone,
} from "./types";
import {
  pct,
  spaceActivateCall,
  spaceDeactivateCall,
  spaceSetLevelCall,
  spaceSetMasterCall,
  spacesWsMsg,
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
  private _fetched = false;

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

  private _activate(space: WsSpace, source: string, level?: string): void {
    void this._runRefresh(
      spaceActivateCall(space.id, { source, level: level ?? space.level ?? "listening" })
    );
  }
  private _deactivate(space: WsSpace): void {
    void this._runRefresh(spaceDeactivateCall(space.id));
  }
  private _setLevel(space: WsSpace, level: string): void {
    void this._runRefresh(spaceSetLevelCall(space.id, level));
  }
  private _setMaster(space: WsSpace, value: number, commit: boolean): void {
    this._pendingMaster = { ...this._pendingMaster, [space.id]: value };
    if (commit) void this._runRefresh(spaceSetMasterCall(space.id, value));
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
      <div class="src">
        <span>Source: ${this._inputName(s.source) ?? s.source ?? "—"}</span>
        <div class="chips small">
          ${this._inputs.map(
            (i) => html`<button class="chip ${i.entity === s.source ? "on" : ""}"
              @click=${() => this._activate(s, i.entity)}>${i.name}</button>`
          )}
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
    return html`
      <div class="zone">
        <button class="icon-btn" title=${on ? "Turn off" : "Turn on"}
          @click=${() => this._zoneToggle(s, z, !on)}>
          <ha-icon icon=${on ? "mdi:speaker" : "mdi:speaker-off"}></ha-icon>
        </button>
        <span class="zname">${z.name}</span>
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
    input[type="range"] { accent-color: var(--primary-color); }
  `;
}
