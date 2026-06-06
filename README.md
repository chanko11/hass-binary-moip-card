# Binary MoIP Audio card

A custom Lovelace card for the
[`binary_moip`](https://github.com/chanko11/hass-binary-moip) Home Assistant
integration. **Streaming-as-parent** whole-home audio: pick an **input** (a
stream or a physical line-in), swap a stream's **content** (Spotify / radio /
playlist…), and control that input's **zones** and volume.

It drives only standard services — `media_player.join`/`unjoin` for routing,
`volume_set`/`volume_mute` and transport on the input, and
`music_assistant.play_media` for content swaps — so it's generic: every entity
and content preset comes from card config, nothing is hardcoded to a house.

> **v2** supersedes the v1 "source-first session" card. Card type is now
> `custom:binary-moip-card` and the config is input/content-based (below).

## The model

- An **input** is the durable parent that owns its **zones + volume**. Two kinds:
  - **stream** — content is *swappable* (a Music-Assistant-fed feed). Pick
    Spotify / Pandora / radio, one at a time per stream.
  - **physical** — content is *fixed* (the device itself, e.g. a record player);
    no swap, no transport.
- **Zones belong to the input, not the content.** Swapping a stream's content
  does **not** change its routing — the same rooms keep playing what's now on the
  stream. (Routing lives on the `binary_moip` source; a swap is just a play
  action on the backing MA player.)

## What it shows

- **Input rail** — the streams + physical line-ins. Each tile shows the
  **content as the headline** (e.g. "Spotify"), the **input name** as a quiet
  subtitle, plus an active dot + state (idle streams read "Idle"). Tap to select.
- **Selected input:**
  - *Stream* → current content + a **Change source** picker (your presets + a
    Spotify-Connect entry), then now-playing (artwork/title/artist) + transport.
  - *Physical* → fixed-source label + a "live input — no skip/pause" note.
- **Master volume** — "All zones" slider; rounded average; dragging applies the
  delta to every member zone (preserving trims, clamped 0–100).
- **Zone rows** — per zone: name, mute, volume slider, %, remove (`unjoin`).
- **Add zones** — picker grouped by `zone_groups` (or HA area); one tap joins a
  zone (taking it from another input if needed; cross-input zones are flagged).

All state is read live from Home Assistant.

## Change source (source-first picker)

**Change source** opens a list of sibling **sources**. By default:
- **Music Assistant** → drills (via `browse_media` on the stream's `ma_player`)
  into the MA **library** categories (Playlists, Radio) → pick an item →
  `music_assistant.play_media` on that player (`enqueue: replace`, `radio_mode`
  for Radio). Routing is untouched, so the zones keep playing the new content.
- **Spotify Connect** → no browse; shows "Cast from your Spotify app to
  {stream}." Now-playing fills in once you cast.

Everything is HA-native (`browse_media` + `play_media`) — works remotely and
stays stable across MA versions. (MA's per-account provider folders aren't
exposed to HA; see the spec for the rationale.)

## Configuration

| Option        | Required | Description |
|---------------|----------|-------------|
| `type`        | yes      | `custom:binary-moip-card` |
| `inputs`      | yes      | Ordered inputs (below). |
| `sources`     | no       | The stream picker's sibling sources. Defaults to Music Assistant + Spotify Connect. |
| `zone_groups` | no       | Label → MoIP zone entity_ids, for the Add-zones picker (else grouped by HA area). |
| `title`       | no       | Optional card header. |

**`inputs[]`** — `entity` (binary_moip source: routing + transport), `name`,
`kind` (`stream` \| `physical`), and for streams `ma_player` (the Music Assistant
player to browse + play on). Optional `icon`.

**`sources[]`** (optional; omit to use the defaults) — each is either:
- `{ type: library, label?, icon?, categories? }` — browse MA's library;
  `categories` defaults to `[playlists, radio]` (also `artists`, `albums`,
  `tracks`, …).
- `{ type: connect, label?, icon? }` — a cast-only entry (e.g. Spotify Connect).

### Example

```yaml
type: custom:binary-moip-card
inputs:
  - { entity: media_player.ha_streaming_1, name: Streaming 1, kind: stream, ma_player: media_player.streaming_1 }
  - { entity: media_player.ha_streaming_2, name: Streaming 2, kind: stream, ma_player: media_player.streaming_2 }
  - { entity: media_player.record_player,  name: Record player, kind: physical }
# sources: omitted -> defaults to Music Assistant (library) + Spotify Connect
zone_groups:
  Main House: [media_player.kitchen, media_player.parlor, media_player.dining_room]
  Outdoor:    [media_player.pool, media_player.outdoor_seating]
```

## Install

### HACS

1. HACS → **⋮ → Custom repositories** → add
   `https://github.com/chanko11/hass-binary-moip-card`, category **Dashboard**.
2. Find **Binary MoIP Audio Card** → **Download**; HACS registers the resource.
3. Add the card (config above).

### Manual

1. Build (`npm install && npm run build`) or grab `dist/binary-moip-card.js`.
2. Copy it into `config/www/`.
3. Settings → Dashboards → ⋮ → Resources → add `/local/binary-moip-card.js`
   (type **JavaScript module**).

## Development

```bash
npm install
npm run build       # bundle -> dist/binary-moip-card.js
npm run build -- --watch
npm test            # volume/join math + the content-swap (play_media) builder
npm run typecheck
```

The card is a thin Lit layer over pure functions in `src/logic.ts` (volume math,
session derivation, and the `join`/`unjoin`/`volume_set`/transport/`play_media`
builders), which is where the tests live.
