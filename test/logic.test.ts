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
  zoneInScope,
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

test("discoverZoneIds fallback = binary_moip zones (VOLUME_SET) only", () => {
  const F = MediaPlayerFeature;
  const hass: HomeAssistant = {
    states: {
      // a real zone (output) supports volume
      "media_player.zone1": ent("media_player.zone1", "idle", { supported_features: F.VOLUME_SET | F.GROUPING }),
      // a binary_moip INPUT/source: grouping/transport only, no volume
      "media_player.input1": ent("media_player.input1", "idle", { supported_features: F.GROUPING | F.PLAY }),
      "media_player.cast": ent("media_player.cast", "idle", { supported_features: F.VOLUME_SET }),
    },
    entities: {
      "media_player.zone1": { entity_id: "media_player.zone1", platform: "binary_moip" },
      "media_player.input1": { entity_id: "media_player.input1", platform: "binary_moip" },
      "media_player.cast": { entity_id: "media_player.cast", platform: "cast" },
    },
    callService: async () => undefined,
    callWS: (async () => undefined) as HomeAssistant["callWS"],
  };
  const ids = discoverZoneIds(hass, { type: "x", sources: [] });
  // input1 excluded (no VOLUME_SET), cast excluded (not binary_moip)
  assert.deepEqual(ids, ["media_player.zone1"]);
});

test("discoverZoneIds prefers moip_role over the VOLUME_SET heuristic", () => {
  const F = MediaPlayerFeature;
  const hass: HomeAssistant = {
    states: {
      // role says zone even though it has no VOLUME_SET -> included
      "media_player.z": ent("media_player.z", "idle", { moip_role: "zone" }),
      // role says source even though it has VOLUME_SET -> excluded
      "media_player.s": ent("media_player.s", "idle", { moip_role: "source", supported_features: F.VOLUME_SET }),
    },
    entities: {
      "media_player.z": { entity_id: "media_player.z", platform: "binary_moip" },
      "media_player.s": { entity_id: "media_player.s", platform: "binary_moip" },
    },
    callService: async () => undefined,
    callWS: (async () => undefined) as HomeAssistant["callWS"],
  };
  assert.deepEqual(discoverZoneIds(hass, { type: "x", sources: [] }), ["media_player.z"]);
});

test("floors/areas scope filters discovery and zoneInScope", () => {
  const hass: HomeAssistant = {
    states: {
      "media_player.kitchen": ent("media_player.kitchen", "idle", { moip_role: "zone" }),
      "media_player.bedroom": ent("media_player.bedroom", "idle", { moip_role: "zone" }),
    },
    entities: {
      "media_player.kitchen": { entity_id: "media_player.kitchen", platform: "binary_moip", area_id: "kitchen" },
      "media_player.bedroom": { entity_id: "media_player.bedroom", platform: "binary_moip", area_id: "bed" },
    },
    areas: {
      kitchen: { area_id: "kitchen", name: "Kitchen", floor_id: "main" },
      bed: { area_id: "bed", name: "Bedroom", floor_id: "up" },
    },
    floors: {
      main: { floor_id: "main", name: "Main", level: 0 },
      up: { floor_id: "up", name: "Upstairs", level: 1 },
    },
    callService: async () => undefined,
    callWS: (async () => undefined) as HomeAssistant["callWS"],
  };
  // scope by floor name (case-insensitive)
  assert.deepEqual(discoverZoneIds(hass, { type: "x", sources: [], floors: "main" }), ["media_player.kitchen"]);
  // scope by area name
  assert.deepEqual(discoverZoneIds(hass, { type: "x", sources: [], areas: ["Bedroom"] }), ["media_player.bedroom"]);
  // no scope -> both; predicate matches by area_id too
  assert.equal(zoneInScope(hass, "media_player.kitchen", { sources: [] }), true);
  assert.equal(zoneInScope(hass, "media_player.kitchen", { sources: [], areas: ["kitchen"] }), true);
  assert.equal(zoneInScope(hass, "media_player.bedroom", { sources: [], floors: ["Main"] }), false);
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

test("groupZones falls back to floor-first area grouping, then 'Zones'", () => {
  const hass: HomeAssistant = {
    states: {
      "media_player.a": ent("media_player.a"),
      "media_player.b": ent("media_player.b"),
      "media_player.c": ent("media_player.c"),
    },
    entities: {
      "media_player.a": { entity_id: "media_player.a", area_id: "kitchen" },
      "media_player.b": { entity_id: "media_player.b", area_id: "bed" },
      "media_player.c": { entity_id: "media_player.c" }, // no area
    },
    areas: {
      kitchen: { area_id: "kitchen", name: "Kitchen", floor_id: "main" },
      bed: { area_id: "bed", name: "Bedroom", floor_id: "up" },
    },
    floors: {
      main: { floor_id: "main", name: "Main", level: 0 },
      up: { floor_id: "up", name: "Upstairs", level: 1 },
    },
    callService: async () => undefined,
    callWS: (async () => undefined) as HomeAssistant["callWS"],
  };
  const groups = groupZones(hass, { type: "x", sources: [] }, [
    "media_player.a",
    "media_player.b",
    "media_player.c",
  ]);
  // grouped by FLOOR (Main level 0 before Upstairs level 1), no-floor "Zones" last
  assert.deepEqual(groups, [
    { label: "Main", zones: ["media_player.a"] },
    { label: "Upstairs", zones: ["media_player.b"] },
    { label: "Zones", zones: ["media_player.c"] },
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

// --- Listening Spaces: calibration card builders ----------------------------

test("spacesWsMsg builds the read command", async () => {
  const { spacesWsMsg } = await import("../src/logic.ts");
  assert.deepEqual(spacesWsMsg(), { type: "binary_moip/spaces" });
});

test("calibrationPlayCall: defaults + options", async () => {
  const { calibrationPlayCall } = await import("../src/logic.ts");
  assert.deepEqual(calibrationPlayCall("main_living"), {
    domain: "binary_moip",
    service: "calibration_play",
    data: { space: "main_living", ref_type: "auto" },
  });
  assert.deepEqual(
    calibrationPlayCall("main_living", {
      refType: "pink",
      source: "media_player.ha_streaming_1",
      level: "listening",
      setLevels: false,
    }).data,
    {
      space: "main_living",
      ref_type: "pink",
      source: "media_player.ha_streaming_1",
      level: "listening",
      set_levels: false,
    }
  );
});

test("setAnchorCall snapshots (no value) or stores an explicit value", async () => {
  const { setAnchorCall } = await import("../src/logic.ts");
  assert.deepEqual(setAnchorCall("s", 11, "party").data, { space: "s", zone: 11, level: "party" });
  assert.deepEqual(setAnchorCall("s", 11, "party", 70).data, {
    space: "s", zone: 11, level: "party", value: 70,
  });
});

test("clearAnchorCall + spaceDeactivateCall", async () => {
  const { clearAnchorCall, spaceDeactivateCall } = await import("../src/logic.ts");
  assert.deepEqual(clearAnchorCall("s", 11, "background"), {
    domain: "binary_moip", service: "calibration_clear_anchor",
    data: { space: "s", zone: 11, level: "background" },
  });
  assert.deepEqual(spaceDeactivateCall("s"), {
    domain: "binary_moip", service: "space_deactivate", data: { space: "s" },
  });
});
