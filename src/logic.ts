// Pure, framework-free logic for the source-first session card. Everything here
// is a plain function of (hass data / config) so it is unit-testable without a
// DOM or Lit. The card component is a thin rendering layer over these.

import {
  ContentPreset,
  HassEntity,
  HomeAssistant,
  MediaPlayerFeature,
  ServiceCall,
  ZoneSourceConfig,
} from "./types";

export const clamp = (n: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, n));

/** volume_level (0–1) -> integer percent (0–100). Null/undefined -> 0. */
export const pct = (level: number | null | undefined): number =>
  Math.round(clamp(level ?? 0, 0, 1) * 100);

export function friendlyName(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

/** Zones routed to a source = its group_members minus the source itself. */
export function sessionZoneIds(source: HassEntity | undefined): string[] {
  const members = source?.attributes.group_members ?? [];
  return members.filter((id) => id !== source?.entity_id);
}

/** A source is "active" if it has zones routed to it or is playing. */
export function isSourceActive(source: HassEntity | undefined): boolean {
  if (!source) return false;
  return sessionZoneIds(source).length > 0 || source.state === "playing";
}

export function hasFeature(
  entity: HassEntity | undefined,
  feature: number
): boolean {
  const flags = entity?.attributes.supported_features ?? 0;
  return (flags & feature) === feature;
}

/** Source advertises any transport control (play/pause/next/previous). */
export function sourceHasTransport(source: HassEntity | undefined): boolean {
  return (
    hasFeature(source, MediaPlayerFeature.PLAY) ||
    hasFeature(source, MediaPlayerFeature.PAUSE) ||
    hasFeature(source, MediaPlayerFeature.NEXT_TRACK) ||
    hasFeature(source, MediaPlayerFeature.PREVIOUS_TRACK)
  );
}

/** Rounded average of member zones' volume percentages (0 if none report one). */
export function averageVolumePct(zones: HassEntity[]): number {
  const vols = zones
    .map((z) => z.attributes.volume_level)
    .filter((v): v is number => typeof v === "number");
  if (vols.length === 0) return 0;
  const avg = vols.reduce((a, b) => a + b, 0) / vols.length;
  return Math.round(avg * 100);
}

/**
 * Master "All zones" change: apply the delta (newMasterPct - current average) to
 * every member zone, preserving each zone's relative trim, clamped to 0–100.
 * Returns the volume_set calls needed (only for zones whose value changes).
 */
export function masterDeltaCalls(
  zones: HassEntity[],
  newMasterPct: number
): ServiceCall[] {
  const delta = Math.round(newMasterPct) - averageVolumePct(zones);
  if (delta === 0) return [];
  const calls: ServiceCall[] = [];
  for (const z of zones) {
    const cur = pct(z.attributes.volume_level);
    const target = clamp(cur + delta, 0, 100);
    if (target !== cur) calls.push(volumeSetCall(z.entity_id, target / 100));
  }
  return calls;
}

// --- service-call builders (join/unjoin only for routing — never invent calls) ---

export function joinCall(sourceId: string, zoneId: string): ServiceCall {
  return {
    domain: "media_player",
    service: "join",
    data: { entity_id: sourceId, group_members: [zoneId] },
  };
}

export function unjoinCall(zoneId: string): ServiceCall {
  return {
    domain: "media_player",
    service: "unjoin",
    data: { entity_id: zoneId },
  };
}

export function volumeSetCall(entityId: string, level: number): ServiceCall {
  return {
    domain: "media_player",
    service: "volume_set",
    data: { entity_id: entityId, volume_level: clamp(level, 0, 1) },
  };
}

export function muteCall(entityId: string, muted: boolean): ServiceCall {
  return {
    domain: "media_player",
    service: "volume_mute",
    data: { entity_id: entityId, is_volume_muted: muted },
  };
}

export type TransportService =
  | "media_play_pause"
  | "media_next_track"
  | "media_previous_track";

export function transportCall(
  sourceId: string,
  service: TransportService
): ServiceCall {
  return { domain: "media_player", service, data: { entity_id: sourceId } };
}

/** Map zone entity_id -> the source entity_id it is currently routed to. */
export function zoneToSourceMap(
  hass: HomeAssistant,
  sourceIds: string[]
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const sid of sourceIds) {
    for (const zid of sessionZoneIds(hass.states[sid])) map[zid] = sid;
  }
  return map;
}

/** The universe of zones for the picker. */
export function discoverZoneIds(
  hass: HomeAssistant,
  config: ZoneSourceConfig
): string[] {
  if (config.zone_groups) {
    const ids = new Set<string>();
    for (const list of Object.values(config.zone_groups)) {
      for (const id of list) ids.add(id);
    }
    return [...ids].filter((id) => hass.states[id]);
  }
  // Fallback: every binary_moip media_player that isn't a configured source.
  const sources = new Set(config.sources ?? []);
  const out: string[] = [];
  for (const [eid, ent] of Object.entries(hass.entities ?? {})) {
    if (
      eid.startsWith("media_player.") &&
      ent.platform === "binary_moip" &&
      !sources.has(eid) &&
      hass.states[eid]
    ) {
      out.push(eid);
    }
  }
  return out;
}

function areaNameForEntity(
  hass: HomeAssistant,
  entityId: string
): string | null {
  const ent = hass.entities?.[entityId];
  if (!ent) return null;
  let areaId = ent.area_id ?? null;
  if (!areaId && ent.device_id) {
    areaId = hass.devices?.[ent.device_id]?.area_id ?? null;
  }
  if (!areaId) return null;
  return hass.areas?.[areaId]?.name ?? null;
}

export interface ZoneGroup {
  label: string;
  zones: string[];
}

/** Group zones for the Add-zones picker: by config.zone_groups, else by HA area. */
export function groupZones(
  hass: HomeAssistant,
  config: ZoneSourceConfig,
  zoneIds: string[]
): ZoneGroup[] {
  if (config.zone_groups) {
    return Object.entries(config.zone_groups)
      .map(([label, ids]) => ({
        label,
        zones: ids.filter((id) => hass.states[id]),
      }))
      .filter((g) => g.zones.length > 0);
  }
  const groups: Record<string, string[]> = {};
  for (const z of zoneIds) {
    const label = areaNameForEntity(hass, z) ?? "Zones";
    (groups[label] ??= []).push(z);
  }
  return Object.entries(groups)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, zones]) => ({ label, zones }));
}

// --- v2: content swap (streams only) ----------------------------------------

/** Whether a preset is the informational Spotify-Connect entry (no HA action). */
export function isConnectPreset(p: ContentPreset): boolean {
  return (p as { type?: string }).type === "connect";
}

/**
 * Build the content-swap action for a stream: play the chosen preset on that
 * stream's backing Music Assistant player. Routing is untouched (it lives on
 * the binary_moip source), so the already-routed zones keep playing the new
 * content. Returns null for the Spotify-Connect entry (you cast from the app —
 * there is no HA action) and when no MA player is configured for the stream.
 */
export function playMediaCall(
  maPlayer: string | undefined,
  preset: ContentPreset
): ServiceCall | null {
  if (isConnectPreset(preset) || !maPlayer) return null;
  const p = preset as Exclude<ContentPreset, { type: "connect" }>;
  const data: Record<string, unknown> = {
    entity_id: maPlayer,
    media_id: p.media_id,
    enqueue: "replace",
  };
  if (p.media_type) data.media_type = p.media_type;
  if (p.radio_mode) data.radio_mode = true;
  return { domain: "music_assistant", service: "play_media", data };
}

/**
 * Best-effort index of the preset currently playing on a stream's MA player,
 * matched by media_content_id; -1 if none/unknown. Used to highlight the
 * current content in the picker and as the tile headline.
 */
export function currentPresetIndex(
  maState: HassEntity | undefined,
  presets: ContentPreset[]
): number {
  const cid = maState?.attributes.media_content_id;
  if (!cid || typeof cid !== "string") return -1;
  return presets.findIndex((p) => {
    if (isConnectPreset(p)) return false;
    const id = (p as { media_id?: string }).media_id;
    return !!id && (cid === id || cid.includes(id) || id.includes(cid));
  });
}

/** media_player states we treat as "has content on it". */
export const PLAYING_STATES = new Set(["playing", "paused", "buffering", "on"]);

/**
 * Streaming provider from a Music Assistant media_content_id, e.g.
 * "spotify--e5JxWKtm://track/…" -> "spotify", "http://…" -> "http". Null if none.
 * (MA's only reliable signal for the service — there's no app_name/caster field.)
 */
export function providerFromContentId(cid: string | undefined): string | null {
  if (!cid || typeof cid !== "string" || !cid.includes("://")) return null;
  const scheme = cid.slice(0, cid.indexOf("://"));
  return scheme.split("--")[0].toLowerCase() || null;
}

/**
 * Index of the content currently feeding a stream — for the content-slot header
 * AND the picker's "current" highlight. Matches a preset by media_id; for a
 * Spotify session with no media match (a Connect cast, or a Spotify playlist
 * whose media_content_id is the playing track), points at the Spotify-Connect
 * entry. -1 when idle/unknown.
 */
export function currentContentIndex(
  srcState: HassEntity | undefined,
  maState: HassEntity | undefined,
  presets: ContentPreset[]
): number {
  if (!srcState || !PLAYING_STATES.has(srcState.state)) return -1;
  const i = currentPresetIndex(maState, presets);
  if (i >= 0) return i;
  if (providerFromContentId(maState?.attributes.media_content_id) === "spotify") {
    const j = presets.findIndex(isConnectPreset);
    if (j >= 0) return j;
  }
  return -1;
}

/**
 * The content-slot headline for a stream — the SOURCE, never the track:
 * "Idle" when stopped, the matched preset's label, "Spotify Connect" for a
 * Spotify session, a provider-derived label otherwise.
 */
export function streamHeadline(
  srcState: HassEntity | undefined,
  maState: HassEntity | undefined,
  presets: ContentPreset[]
): { label: string; icon: string } {
  const DEFAULT_ICON = "mdi:music";
  if (!srcState || !PLAYING_STATES.has(srcState.state)) {
    return { label: "Idle", icon: DEFAULT_ICON };
  }
  const idx = currentContentIndex(srcState, maState, presets);
  if (idx >= 0) {
    const p = presets[idx];
    const icon =
      p.icon ?? (isConnectPreset(p) ? "mdi:spotify" : DEFAULT_ICON);
    return { label: p.label, icon };
  }
  const prov = providerFromContentId(maState?.attributes.media_content_id);
  if (prov === "spotify") return { label: "Spotify Connect", icon: "mdi:spotify" };
  if (prov && ["http", "https", "tunein", "radiobrowser", "icyx"].includes(prov)) {
    return { label: "Radio", icon: "mdi:radio" };
  }
  if (prov && prov !== "library") {
    return { label: prov[0].toUpperCase() + prov.slice(1), icon: DEFAULT_ICON };
  }
  return { label: "Playing", icon: DEFAULT_ICON };
}
