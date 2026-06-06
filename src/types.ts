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
  entity_picture?: string;
  media_position?: number;
  media_duration?: number;
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
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, RegistryEntity>;
  devices?: Record<string, RegistryDevice>;
  areas?: Record<string, RegistryArea>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<unknown>;
}

export interface SourceCardConfig {
  type: string;
  /** Ordered source media_player entity_ids to show as chips (required). */
  sources: string[];
  /** Optional label -> zone entity_ids, for organizing the Add-zones picker. */
  zone_groups?: Record<string, string[]>;
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
