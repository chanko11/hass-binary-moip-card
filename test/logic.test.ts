import assert from "node:assert/strict";
import { test } from "node:test";

import {
  averageVolumePct,
  currentContentIndex,
  currentPresetIndex,
  discoverZoneIds,
  groupZones,
  isConnectPreset,
  isSourceActive,
  joinCall,
  masterDeltaCalls,
  muteCall,
  pct,
  playMediaCall,
  providerFromContentId,
  sessionZoneIds,
  sourceHasTransport,
  streamHeadline,
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "../src/logic.ts";
import {
  ContentPreset,
  HassEntity,
  HomeAssistant,
  MediaPlayerFeature,
} from "../src/types.ts";

function ent(
  entity_id: string,
  state = "idle",
  attributes: Record<string, unknown> = {}
): HassEntity {
  return { entity_id, state, attributes };
}

function hassWith(...entities: HassEntity[]): HomeAssistant {
  const states: Record<string, HassEntity> = {};
  for (const e of entities) states[e.entity_id] = e;
  return { states, callService: async () => undefined };
}

// --- pct ---------------------------------------------------------------------

test("pct rounds and handles null/clamp", () => {
  assert.equal(pct(0.4), 40);
  assert.equal(pct(0.005), 1); // 0.5% rounds to 1
  assert.equal(pct(undefined), 0);
  assert.equal(pct(null), 0);
  assert.equal(pct(1.5), 100); // clamped
});

// --- session derivation ------------------------------------------------------

test("sessionZoneIds drops the source (leader) itself", () => {
  const src = ent("media_player.src", "playing", {
    group_members: ["media_player.src", "media_player.a", "media_player.b"],
  });
  assert.deepEqual(sessionZoneIds(src), ["media_player.a", "media_player.b"]);
  assert.deepEqual(sessionZoneIds(undefined), []);
});

test("isSourceActive when it has zones or is playing", () => {
  assert.equal(
    isSourceActive(ent("s", "idle", { group_members: ["s", "z"] })),
    true
  );
  assert.equal(isSourceActive(ent("s", "playing", { group_members: ["s"] })), true);
  assert.equal(isSourceActive(ent("s", "idle", { group_members: ["s"] })), false);
});

test("sourceHasTransport reflects supported_features", () => {
  const F = MediaPlayerFeature;
  assert.equal(
    sourceHasTransport(ent("s", "idle", { supported_features: F.GROUPING })),
    false
  );
  assert.equal(
    sourceHasTransport(
      ent("s", "idle", { supported_features: F.GROUPING | F.PLAY | F.PAUSE })
    ),
    true
  );
});

// --- volume math -------------------------------------------------------------

test("averageVolumePct averages and rounds; ignores zones with no volume", () => {
  assert.equal(
    averageVolumePct([
      ent("a", "idle", { volume_level: 0.4 }),
      ent("b", "idle", { volume_level: 0.6 }),
    ]),
    50
  );
  assert.equal(
    averageVolumePct([
      ent("a", "idle", { volume_level: 0.3 }),
      ent("b", "idle", {}), // no volume -> ignored
    ]),
    30
  );
  assert.equal(averageVolumePct([]), 0);
});

test("masterDeltaCalls applies the delta to every zone, preserving trims", () => {
  const zones = [
    ent("a", "idle", { volume_level: 0.4 }),
    ent("b", "idle", { volume_level: 0.6 }),
  ];
  // average 50 -> drag to 60 => delta +10
  const calls = masterDeltaCalls(zones, 60);
  assert.deepEqual(
    calls.map((c) => [c.data.entity_id, c.data.volume_level]),
    [
      ["a", 0.5],
      ["b", 0.7],
    ]
  );
});

test("masterDeltaCalls clamps 0-100 and skips unchanged zones", () => {
  const zones = [
    ent("a", "idle", { volume_level: 0.95 }),
    ent("b", "idle", { volume_level: 1.0 }),
  ];
  // average 98 (round(97.5)) -> drag to 100 => delta +2
  const calls = masterDeltaCalls(zones, 100);
  // a: 95 -> 97; b: 100 -> 100 (clamped, unchanged -> no call)
  assert.deepEqual(
    calls.map((c) => [c.data.entity_id, c.data.volume_level]),
    [["a", 0.97]]
  );
});

test("masterDeltaCalls is a no-op when the value doesn't move", () => {
  const zones = [ent("a", "idle", { volume_level: 0.5 })];
  assert.deepEqual(masterDeltaCalls(zones, 50), []);
});

// --- service-call builders ---------------------------------------------------

test("join/unjoin/volume/mute/transport build correct calls", () => {
  assert.deepEqual(joinCall("media_player.src", "media_player.z"), {
    domain: "media_player",
    service: "join",
    data: { entity_id: "media_player.src", group_members: ["media_player.z"] },
  });
  assert.deepEqual(unjoinCall("media_player.z"), {
    domain: "media_player",
    service: "unjoin",
    data: { entity_id: "media_player.z" },
  });
  assert.deepEqual(volumeSetCall("media_player.z", 1.4).data, {
    entity_id: "media_player.z",
    volume_level: 1, // clamped
  });
  assert.equal(muteCall("media_player.z", true).data.is_volume_muted, true);
  assert.deepEqual(transportCall("media_player.src", "media_play_pause"), {
    domain: "media_player",
    service: "media_play_pause",
    data: { entity_id: "media_player.src" },
  });
});

// --- cross-source mapping + discovery + grouping -----------------------------

test("zoneToSourceMap maps each zone to its current source", () => {
  const hass = hassWith(
    ent("media_player.s1", "playing", { group_members: ["media_player.s1", "media_player.a"] }),
    ent("media_player.s2", "idle", { group_members: ["media_player.s2", "media_player.b"] })
  );
  assert.deepEqual(zoneToSourceMap(hass, ["media_player.s1", "media_player.s2"]), {
    "media_player.a": "media_player.s1",
    "media_player.b": "media_player.s2",
  });
});

test("discoverZoneIds uses zone_groups when provided", () => {
  const hass = hassWith(ent("media_player.a"), ent("media_player.b"));
  const ids = discoverZoneIds(hass, {
    type: "x",
    sources: ["media_player.s1"],
    zone_groups: { Main: ["media_player.a", "media_player.missing"], Out: ["media_player.b"] },
  });
  assert.deepEqual(ids.sort(), ["media_player.a", "media_player.b"]); // missing dropped
});

test("discoverZoneIds falls back to binary_moip platform minus sources", () => {
  const hass: HomeAssistant = {
    states: {
      "media_player.zone1": ent("media_player.zone1"),
      "media_player.src1": ent("media_player.src1"),
      "media_player.cast": ent("media_player.cast"),
    },
    entities: {
      "media_player.zone1": { entity_id: "media_player.zone1", platform: "binary_moip" },
      "media_player.src1": { entity_id: "media_player.src1", platform: "binary_moip" },
      "media_player.cast": { entity_id: "media_player.cast", platform: "cast" },
    },
    callService: async () => undefined,
  };
  const ids = discoverZoneIds(hass, { type: "x", sources: ["media_player.src1"] });
  assert.deepEqual(ids, ["media_player.zone1"]); // src excluded, non-moip excluded
});

test("groupZones honors config order and drops empty groups", () => {
  const hass = hassWith(ent("media_player.a"), ent("media_player.b"));
  const groups = groupZones(
    hass,
    {
      type: "x",
      sources: [],
      zone_groups: { Main: ["media_player.a"], Empty: ["media_player.gone"], Out: ["media_player.b"] },
    },
    []
  );
  assert.deepEqual(groups, [
    { label: "Main", zones: ["media_player.a"] },
    { label: "Out", zones: ["media_player.b"] },
  ]);
});

test("groupZones falls back to area name, then 'Zones'", () => {
  const hass: HomeAssistant = {
    states: { "media_player.a": ent("media_player.a"), "media_player.b": ent("media_player.b") },
    entities: {
      "media_player.a": { entity_id: "media_player.a", area_id: "kitchen" },
      "media_player.b": { entity_id: "media_player.b" }, // no area
    },
    areas: { kitchen: { area_id: "kitchen", name: "Kitchen" } },
    callService: async () => undefined,
  };
  const groups = groupZones(hass, { type: "x", sources: [] }, ["media_player.a", "media_player.b"]);
  assert.deepEqual(groups, [
    { label: "Kitchen", zones: ["media_player.a"] },
    { label: "Zones", zones: ["media_player.b"] },
  ]);
});

// --- v2: content swap (preset -> music_assistant.play_media) ------------------

test("playMediaCall builds a music_assistant.play_media for an MA preset", () => {
  const preset: ContentPreset = {
    label: "Yacht Rock",
    media_id: "library://playlist/123",
    media_type: "playlist",
  };
  assert.deepEqual(playMediaCall("media_player.streaming_1", preset), {
    domain: "music_assistant",
    service: "play_media",
    data: {
      entity_id: "media_player.streaming_1",
      media_id: "library://playlist/123",
      enqueue: "replace",
      media_type: "playlist",
    },
  });
});

test("playMediaCall includes radio_mode only when set", () => {
  const radio: ContentPreset = {
    label: "KUTX",
    media_id: "http://stream",
    media_type: "radio",
    radio_mode: true,
  };
  assert.equal(playMediaCall("media_player.streaming_2", radio)!.data.radio_mode, true);

  const plain: ContentPreset = { label: "P", media_id: "x" };
  assert.equal("radio_mode" in playMediaCall("media_player.s", plain)!.data, false);
  assert.equal("media_type" in playMediaCall("media_player.s", plain)!.data, false);
});

test("playMediaCall is a no-op (null) for the Spotify-Connect entry", () => {
  const connect: ContentPreset = { label: "Spotify Connect", type: "connect" };
  assert.equal(playMediaCall("media_player.streaming_1", connect), null);
  assert.equal(isConnectPreset(connect), true);
});

test("playMediaCall is a no-op when the stream has no MA player", () => {
  const preset: ContentPreset = { label: "P", media_id: "x" };
  assert.equal(playMediaCall(undefined, preset), null);
});

test("currentPresetIndex matches the playing content by media_content_id", () => {
  const presets: ContentPreset[] = [
    { label: "Spotify Connect", type: "connect" },
    { label: "Yacht Rock", media_id: "library://playlist/123" },
    { label: "KUTX", media_id: "http://stream" },
  ];
  const ma = ent("media_player.streaming_1", "playing", {
    media_content_id: "library://playlist/123",
  });
  assert.equal(currentPresetIndex(ma, presets), 1);
  // nothing playing / unknown id -> -1
  assert.equal(currentPresetIndex(ent("media_player.s", "idle", {}), presets), -1);
  assert.equal(currentPresetIndex(undefined, presets), -1);
});

// --- v2: content-slot headline (source, never the track) ---------------------

test("providerFromContentId reads the MA scheme", () => {
  assert.equal(providerFromContentId("spotify--e5JxWKtm://track/abc"), "spotify");
  assert.equal(providerFromContentId("library://playlist/15"), "library");
  assert.equal(providerFromContentId("http://stream.example/x"), "http");
  assert.equal(providerFromContentId(undefined), null);
  assert.equal(providerFromContentId("not-a-uri"), null);
});

test("currentContentIndex matches a preset, else points to Connect for Spotify", () => {
  const presets: ContentPreset[] = [
    { label: "Spotify Connect", type: "connect" },
    { label: "KUTX", media_id: "http://stream" },
  ];
  const playing = (_cid: string) =>
    ent("media_player.ha_streaming_1", "playing", {}); // source row
  const ma = (cid: string) => ent("media_player.streaming_1", "playing", { media_content_id: cid });

  // radio preset playing -> its index
  assert.equal(currentContentIndex(playing("x"), ma("http://stream/now"), presets), 1);
  // spotify track (no media match) -> the Connect entry (index 0)
  assert.equal(
    currentContentIndex(playing("x"), ma("spotify--ab://track/9"), presets),
    0
  );
  // idle source -> -1 regardless of MA
  assert.equal(
    currentContentIndex(ent("media_player.ha_streaming_1", "idle", {}), ma("spotify--ab://track/9"), presets),
    -1
  );
  // spotify but no Connect entry configured -> -1
  assert.equal(
    currentContentIndex(playing("x"), ma("spotify--ab://track/9"), [{ label: "KUTX", media_id: "http://stream" }]),
    -1
  );
});

test("streamHeadline shows the source, never the track title", () => {
  const presets: ContentPreset[] = [
    { label: "Spotify Connect", type: "connect" },
    { label: "KUTX 98.9", icon: "mdi:radio-tower", media_id: "http://stream" },
  ];
  const src = (state: string) => ent("media_player.ha_streaming_1", state, {});
  const ma = (attrs: Record<string, unknown>) => ent("media_player.streaming_1", "playing", attrs);

  // idle
  assert.deepEqual(streamHeadline(src("idle"), ma({}), presets), { label: "Idle", icon: "mdi:music" });
  // a Spotify session playing a track -> "Spotify Connect" (NOT "Backwater")
  assert.equal(
    streamHeadline(src("playing"), ma({ media_content_id: "spotify--ab://track/9", media_title: "Backwater" }), presets).label,
    "Spotify Connect"
  );
  // a radio preset -> its label
  assert.equal(
    streamHeadline(src("playing"), ma({ media_content_id: "http://stream/now", media_title: "Some show" }), presets).label,
    "KUTX 98.9"
  );
  // spotify with no Connect preset configured -> still "Spotify Connect", never the track
  assert.equal(
    streamHeadline(src("playing"), ma({ media_content_id: "spotify--ab://track/9", media_title: "Backwater" }), [])
      .label,
    "Spotify Connect"
  );
});
