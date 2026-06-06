import assert from "node:assert/strict";
import { test } from "node:test";

import {
  averageVolumePct,
  browseMsg,
  DEFAULT_SOURCES,
  discoverZoneIds,
  groupZones,
  isConnectSource,
  isSourceActive,
  joinCall,
  masterDeltaCalls,
  muteCall,
  pct,
  playItemCall,
  sessionZoneIds,
  sourceHasTransport,
  transportCall,
  unjoinCall,
  volumeSetCall,
  zoneToSourceMap,
} from "../src/logic.ts";
import { HassEntity, HomeAssistant, MediaPlayerFeature } from "../src/types.ts";

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
  return { states, callService: async () => undefined, callWS: (async () => undefined) as HomeAssistant["callWS"] };
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
    callWS: (async () => undefined) as HomeAssistant["callWS"],
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
    callWS: (async () => undefined) as HomeAssistant["callWS"],
  };
  const groups = groupZones(hass, { type: "x", sources: [] }, ["media_player.a", "media_player.b"]);
  assert.deepEqual(groups, [
    { label: "Kitchen", zones: ["media_player.a"] },
    { label: "Zones", zones: ["media_player.b"] },
  ]);
});

// --- v2.2: browse -> play (item URI -> music_assistant.play_media) ------------

test("playItemCall plays a browsed item's URI on the stream's MA player", () => {
  assert.deepEqual(
    playItemCall("media_player.streaming_1", "library://playlist/17"),
    {
      domain: "music_assistant",
      service: "play_media",
      data: {
        entity_id: "media_player.streaming_1",
        media_id: "library://playlist/17",
        enqueue: "replace",
      },
    }
  );
});

test("playItemCall adds radio_mode / media_type only when given", () => {
  const r = playItemCall("media_player.s", "library://radio/3", { radioMode: true });
  assert.equal(r.data.radio_mode, true);
  const m = playItemCall("media_player.s", "x", { mediaType: "playlist" });
  assert.equal(m.data.media_type, "playlist");
  const plain = playItemCall("media_player.s", "x");
  assert.equal("radio_mode" in plain.data, false);
  assert.equal("media_type" in plain.data, false);
});

test("default sources = Music Assistant (library) + Spotify Connect (cast)", () => {
  assert.equal(DEFAULT_SOURCES.length, 2);
  assert.equal(DEFAULT_SOURCES[0].type, "library");
  assert.equal(DEFAULT_SOURCES[0].label, "Music Assistant");
  assert.equal(isConnectSource(DEFAULT_SOURCES[1]), true);
  assert.equal(isConnectSource(DEFAULT_SOURCES[0]), false);
});

test("browseMsg targets the MA player; root has no content id", () => {
  assert.deepEqual(browseMsg("media_player.streaming_1"), {
    type: "media_player/browse_media",
    entity_id: "media_player.streaming_1",
  });
  assert.deepEqual(browseMsg("media_player.streaming_1", "playlists", "music_assistant"), {
    type: "media_player/browse_media",
    entity_id: "media_player.streaming_1",
    media_content_id: "playlists",
    media_content_type: "music_assistant",
  });
});
