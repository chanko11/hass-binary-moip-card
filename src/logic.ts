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

/** Is this entity a binary_moip ZONE (output)? Prefer the integration's
 *  explicit `moip_role` (v0.3.1+); fall back to the VOLUME_SET heuristic for
 *  older integration versions (sources are grouping/transport-only). */
function isZoneEntity(st: HassEntity): boolean {
  const role = st.attributes.moip_role;
  if (role) return role === "zone";
  return (
    ((st.attributes.supported_features ?? 0) & MediaPlayerFeature.VOLUME_SET) !== 0
  );
}

function toLowerList(v?: string | string[]): string[] {
  if (!v) return [];
  return (Array.isArray(v) ? v : [v]).map((s) => s.toLowerCase());
}

/** Is a zone within the card's configured floor/area scope? True when no scope
 *  is set. Matches floors/areas by name OR id (case-insensitive). */
export function zoneInScope(
  hass: HomeAssistant,
  entityId: string,
  config: ZoneSourceConfig
): boolean {
  const floors = toLowerList(config.floors);
  const areas = toLowerList(config.areas);
  if (!floors.length && !areas.length) return true;

  const aid = areaIdForEntity(hass, entityId);
  const area = aid ? hass.areas?.[aid] : undefined;
  const fid = area?.floor_id ?? null;
  const floor = fid ? hass.floors?.[fid] : undefined;

  if (areas.length) {
    const ok =
      (!!aid && areas.includes(aid.toLowerCase())) ||
      (!!area?.name && areas.includes(area.name.toLowerCase()));
    if (!ok) return false;
  }
  if (floors.length) {
    const ok =
      (!!fid && floors.includes(fid.toLowerCase())) ||
      (!!floor?.name && floors.includes(floor.name.toLowerCase()));
    if (!ok) return false;
  }
  return true;
}

/** The universe of zones for the picker (honors any floor/area scope). */
export function discoverZoneIds(
  hass: HomeAssistant,
  config: ZoneSourceConfig
): string[] {
  let ids: string[];
  if (config.zone_groups) {
    const set = new Set<string>();
    for (const list of Object.values(config.zone_groups)) {
      for (const id of list) set.add(id);
    }
    ids = [...set].filter((id) => hass.states[id]);
  } else {
    // Every binary_moip media_player that is a ZONE (output). The integration
    // also exposes inputs/sources as media_players; isZoneEntity() filters them
    // out (via moip_role, else the VOLUME_SET heuristic). Configured sources
    // are excluded too.
    const sources = new Set(config.sources ?? []);
    ids = [];
    for (const [eid, ent] of Object.entries(hass.entities ?? {})) {
      const st = hass.states[eid];
      if (
        eid.startsWith("media_player.") &&
        ent.platform === "binary_moip" &&
        !sources.has(eid) &&
        st &&
        isZoneEntity(st)
      ) {
        ids.push(eid);
      }
    }
  }
  return ids.filter((id) => zoneInScope(hass, id, config));
}

function areaIdForEntity(hass: HomeAssistant, entityId: string): string | null {
  const ent = hass.entities?.[entityId];
  if (!ent) return null;
  let areaId = ent.area_id ?? null;
  if (!areaId && ent.device_id) {
    areaId = hass.devices?.[ent.device_id]?.area_id ?? null;
  }
  return areaId ?? null;
}

/** The picture URL of a zone's HA Area, for tile backgrounds (null if none). */
export function areaPictureForEntity(
  hass: HomeAssistant,
  entityId: string
): string | null {
  const aid = areaIdForEntity(hass, entityId);
  return (aid ? hass.areas?.[aid]?.picture : null) ?? null;
}

export interface ZoneGroup {
  label: string;
  zones: string[];
}

/**
 * Group zones for the Add-zones picker.
 * - With `config.zone_groups`: the explicit, ordered groups.
 * - Otherwise: by HA **Floor** (heading = floor name, zones listed directly —
 *   zone names are ~1:1 with areas, so the area sub-label is redundant). Floors
 *   order by level (unset = top), then name; zones with no floor fall under
 *   "Zones" last.
 */
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

  const byFloor: Record<string, { name: string; level: number; zones: string[] }> = {};
  const noFloor: string[] = [];
  for (const z of zoneIds) {
    const aid = areaIdForEntity(hass, z);
    const area = aid ? hass.areas?.[aid] : undefined;
    const fid = area?.floor_id ?? null;
    const floor = fid ? hass.floors?.[fid] : undefined;
    if (fid && floor) {
      (byFloor[fid] ??= { name: floor.name, level: floor.level ?? 0, zones: [] }).zones.push(z);
    } else {
      noFloor.push(z);
    }
  }

  const byName = (a: string, b: string) =>
    friendlyName(hass, a).localeCompare(friendlyName(hass, b));
  const groups: ZoneGroup[] = Object.values(byFloor)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
    .map((f) => ({ label: f.name, zones: f.zones.sort(byName) }));
  if (noFloor.length) groups.push({ label: "Zones", zones: noFloor.sort(byName) });
  return groups;
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

// --- Listening Spaces: calibration card service/ws builders ------------------

/** Websocket message to read all Listening Spaces (binary_moip/spaces). */
export function spacesWsMsg(): Record<string, unknown> {
  return { type: "binary_moip/spaces" };
}

export interface CalibrationPlayOpts {
  refType?: "auto" | "pink" | "sample";
  source?: string;
  sample?: string;
  level?: string;
  setLevels?: boolean;
}

/** Audition a reference across a Space's zones for calibration. */
export function calibrationPlayCall(
  space: string,
  opts: CalibrationPlayOpts = {}
): ServiceCall {
  const data: Record<string, unknown> = { space, ref_type: opts.refType ?? "auto" };
  if (opts.source) data.source = opts.source;
  if (opts.sample) data.sample = opts.sample;
  if (opts.level) data.level = opts.level;
  if (opts.setLevels !== undefined) data.set_levels = opts.setLevels;
  return { domain: "binary_moip", service: "calibration_play", data };
}

/** Save a zone's anchor for a level (omit value -> snapshot current live). */
export function setAnchorCall(
  space: string,
  zone: number,
  level: string,
  value?: number
): ServiceCall {
  const data: Record<string, unknown> = { space, zone, level };
  if (value !== undefined) data.value = value;
  return { domain: "binary_moip", service: "calibration_set_anchor", data };
}

/** Clear a zone's anchor for a level (to re-calibrate). */
export function clearAnchorCall(space: string, zone: number, level: string): ServiceCall {
  return {
    domain: "binary_moip",
    service: "calibration_clear_anchor",
    data: { space, zone, level },
  };
}

/** Deactivate a Space (stop calibration audio + unroute). */
export function spaceDeactivateCall(space: string): ServiceCall {
  return { domain: "binary_moip", service: "space_deactivate", data: { space } };
}

// --- Listening Spaces: playback card service builders ------------------------

export interface SpaceActivateOpts {
  level?: string;
  master?: number;
  source?: string;
}

export function spaceActivateCall(space: string, opts: SpaceActivateOpts = {}): ServiceCall {
  const data: Record<string, unknown> = { space };
  if (opts.master !== undefined) data.master = opts.master;
  else if (opts.level) data.level = opts.level;
  if (opts.source) data.source = opts.source;
  return { domain: "binary_moip", service: "space_activate", data };
}

export function spaceSetLevelCall(space: string, level: string): ServiceCall {
  return { domain: "binary_moip", service: "space_set_level", data: { space, level } };
}

export function spaceSetMasterCall(space: string, position: number): ServiceCall {
  return {
    domain: "binary_moip",
    service: "space_set_master",
    data: { space, master: position },
  };
}

export function zoneSetCall(
  space: string,
  zone: number,
  action: "on" | "off" | "nudge",
  delta?: number
): ServiceCall {
  const data: Record<string, unknown> = { space, zone, action };
  if (delta !== undefined) data.delta = delta;
  return { domain: "binary_moip", service: "zone_set", data };
}
