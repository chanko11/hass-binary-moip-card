// Pure, framework-free logic for the source-first session card. Everything here
// is a plain function of (hass data / config) so it is unit-testable without a
// DOM or Lit. The card component is a thin rendering layer over these.

import {
  HassEntity,
  HomeAssistant,
  MediaPlayerFeature,
  ServiceCall,
  StreamSource,
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

// --- v2.2: source-first picker (HA-native browse_media + play_media) ---------

/** media_player states we treat as "has something on it" (vs idle). */
export const PLAYING_STATES = new Set(["playing", "paused", "buffering", "on"]);

export const isPlaying = (state: string | undefined): boolean =>
  !!state && PLAYING_STATES.has(state);

/** The default stream sources: the MA library + the Spotify-Connect sibling. */
export const DEFAULT_SOURCES: StreamSource[] = [
  {
    type: "library",
    label: "Music Assistant",
    icon: "mdi:music-box-multiple",
    categories: ["playlists", "radio"],
  },
  { type: "connect", label: "Spotify Connect", icon: "mdi:spotify" },
];

export const isConnectSource = (s: StreamSource): boolean => s.type === "connect";

/** Presentation for MA library categories (the level under a library source). */
export const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  playlists: { label: "Playlists", icon: "mdi:playlist-music" },
  radio: { label: "Radio", icon: "mdi:radio" },
  artists: { label: "Artists", icon: "mdi:account-music" },
  albums: { label: "Albums", icon: "mdi:album" },
  tracks: { label: "Tracks", icon: "mdi:music-note" },
  podcasts: { label: "Podcasts", icon: "mdi:podcast" },
  audiobooks: { label: "Audiobooks", icon: "mdi:book-music" },
};

export const categoryLabel = (id: string): string =>
  CATEGORY_META[id]?.label ?? id;
export const categoryIcon = (id: string): string =>
  CATEGORY_META[id]?.icon ?? "mdi:folder-music";

/**
 * The browse→play action: play a browsed item's URI on the stream's MA player.
 * Routing is untouched (it lives on the binary_moip source), so the already-
 * routed zones keep playing the new content. `radioMode` for station-like items.
 */
export function playItemCall(
  maPlayer: string,
  uri: string,
  opts: { radioMode?: boolean; mediaType?: string } = {}
): ServiceCall {
  const data: Record<string, unknown> = {
    entity_id: maPlayer,
    media_id: uri,
    enqueue: "replace",
  };
  if (opts.mediaType) data.media_type = opts.mediaType;
  if (opts.radioMode) data.radio_mode = true;
  return { domain: "music_assistant", service: "play_media", data };
}

/** browse_media websocket message for a stream's MA player. */
export function browseMsg(
  maPlayer: string,
  mediaContentId?: string,
  mediaContentType?: string
): Record<string, unknown> {
  const msg: Record<string, unknown> = {
    type: "media_player/browse_media",
    entity_id: maPlayer,
  };
  if (mediaContentId !== undefined) {
    msg.media_content_id = mediaContentId;
    msg.media_content_type = mediaContentType;
  }
  return msg;
}
