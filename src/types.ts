// Minimal Home Assistant frontend types used by the card. Kept local (rather
// than depending on custom-card-helpers) so the bundle stays small and the card
// is generic/publishable.

export interface HassEntityAttributes {
  friendly_name?: string;
  supported_features?: number;
  group_members?: string[];
  volume_level?: number;
  is_volume_muted?: boolean;
  media_title?: string;
  media_artist?: string;
  media_content_id?: string;
  entity_picture?: string;
  media_position?: number;
  media_duration?: number;
  device_class?: string;
  /** binary_moip role marker: "zone" (output) or "source" (input). */
  moip_role?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
}

/** Entity-registry display entry (subset of HA's EntityRegistryDisplayEntry). */
export interface RegistryEntity {
  entity_id: string;
  platform?: string;
  area_id?: string | null;
  device_id?: string | null;
}

export interface RegistryDevice {
  area_id?: string | null;
}

export interface RegistryArea {
  area_id: string;
  name: string;
  floor_id?: string | null;
  picture?: string | null;
}

export interface RegistryFloor {
  floor_id: string;
  name: string;
  level?: number | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, RegistryEntity>;
  devices?: Record<string, RegistryDevice>;
  areas?: Record<string, RegistryArea>;
  floors?: Record<string, RegistryFloor>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<unknown>;
  /** Websocket call — used for media_player/browse_media. */
  callWS<T = unknown>(msg: Record<string, unknown>): Promise<T>;
}

/** A node from media_player/browse_media (subset we use). */
export interface BrowseNode {
  title: string;
  media_content_id: string;
  media_content_type: string;
  can_play?: boolean;
  can_expand?: boolean;
  thumbnail?: string | null;
  media_class?: string | null;
  children_media_class?: string | null;
  children?: BrowseNode[];
}

/** Shared shape the zone helpers need: a zone-grouping map and the set of
 *  source entity_ids to exclude from auto-discovery. v1 and v2 configs both
 *  satisfy it (v2 passes its input entities as `sources`). */
export interface ZoneSourceConfig {
  zone_groups?: Record<string, string[]>;
  sources?: string[];
  /** Scope the card to specific HA Floor(s) — name or floor_id (case-insensitive). */
  floors?: string | string[];
  /** Scope the card to specific HA Area(s) — name or area_id (case-insensitive). */
  areas?: string | string[];
  /** Present on full card configs; ignored by the zone helpers. */
  type?: string;
}

// --- v2: streaming-as-parent ------------------------------------------------

export type InputKind = "stream" | "physical";

/** An input is the durable parent that owns zones + volume (a binary_moip
 *  source). Streams have swappable content (via a backing MA player); physical
 *  inputs are fixed (the device itself). */
export interface InputConfig {
  /** binary_moip source media_player — routing (join/unjoin) + transport. */
  entity: string;
  name: string;
  kind: InputKind;
  /** stream only: the Music Assistant media_player to target for content swaps. */
  ma_player?: string;
  icon?: string;
}

// Stream "sources" — the siblings in the Change-source picker. Structured so
// more siblings (per-account sources) can be added later with no refactor.

/** Browse Music Assistant's library via browse_media (Playlists, Radio, …). */
export interface LibrarySource {
  type: "library";
  label?: string;
  icon?: string;
  /** Library categories to show as the source's top level (default playlists+radio). */
  categories?: string[];
}

/** A cast-only source (e.g. Spotify Connect) — no browse, shows an instruction. */
export interface ConnectSource {
  type: "connect";
  label?: string;
  icon?: string;
}

export type StreamSource = LibrarySource | ConnectSource;

export interface CardConfig {
  type: string;
  /** Ordered inputs: the streams + physical line-ins. */
  inputs: InputConfig[];
  /** The stream picker's sibling sources. Defaults to Music Assistant + Spotify
   *  Connect (see DEFAULT_SOURCES). */
  sources?: StreamSource[];
  /** Optional label -> MoIP zone entity_ids, for the Add-zones picker. */
  zone_groups?: Record<string, string[]>;
  /** Scope the card to specific HA Floor(s) — name or floor_id. Use for a
   *  floor-specific dashboard so only that floor's zones appear. */
  floors?: string | string[];
  /** Scope the card to specific HA Area(s) — name or area_id. Use for a
   *  room/area-specific dashboard. */
  areas?: string | string[];
  title?: string;
}

// --- Listening Spaces (calibration card; reads the binary_moip/spaces ws API) ---

/** A zone within a Space, as returned by the binary_moip/spaces ws command. */
export interface WsZone {
  group_id: number;
  entity_id: string | null;
  name: string;
  /** level -> native anchor value (null = uncalibrated for that level). */
  anchors: Record<string, number | null>;
  calibrated: boolean;
  current_native: number | null;
  bounds: [number | null, number | null];
}

/** A Listening Space, as returned by the binary_moip/spaces ws command. */
export interface WsSpace {
  id: string;
  name: string;
  label: string | null;
  master_positions: Record<string, number>;
  active: boolean;
  master: number | null;
  level: string | null;
  source: string | null;
  zones: WsZone[];
}

export interface CalibrationCardConfig {
  type: string;
  /** MoIP source media_player to route while calibrating (e.g. a streaming input). */
  source?: string;
  title?: string;
}

/** Space-first playback card: turn Spaces on at a level, master, expand to zones. */
export interface SpacesCardConfig {
  type: string;
  /** Selectable sources to activate a Space with (the MoIP inputs/streams). */
  inputs?: InputConfig[];
  /** Change-source picker siblings (MA library / Spotify Connect). Default DEFAULT_SOURCES. */
  sources?: StreamSource[];
  title?: string;
}

/** media_player supported_features bit flags (subset). */
export const MediaPlayerFeature = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  STOP: 4096,
  PLAY: 16384,
  GROUPING: 524288,
} as const;

export interface ServiceCall {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}
