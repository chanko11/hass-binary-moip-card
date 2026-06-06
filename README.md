# Binary MoIP Source Session card

A custom Lovelace card for the [`binary_moip`](../README.md) integration that
gives you **source-first** whole-home audio control: pick a source, see its
now-playing and transport, set a master volume, and add/remove the zones in that
listening session.

It drives only the integration's standard `media_player` services
(`join`/`unjoin` for routing, `volume_set`/`volume_mute`, and transport on
backed sources), so it works with any `binary_moip` setup — nothing here is
hardcoded to a particular house.

## What it shows

- **Source chips** — one per configured source, with an "active" dot when a
  source has zones routed to it or is playing. Tap to select.
- **Now-playing** — for a source with a backing player: artwork, title, artist,
  and prev / play-pause / next. A grouping-only source shows a small
  "<source> — no transport" note instead.
- **Master volume** — an "All zones" slider (shown when the session has zones).
  Its value is the rounded average of the member zones; dragging it applies the
  delta to every zone, preserving each zone's relative trim.
- **Zone rows** — each zone in the session: name, mute, volume slider, %, and an
  X to remove it (`unjoin`).
- **Add zones** — a picker grouped by your `zone_groups` (or by HA area). One tap
  joins a zone to the selected source — even if it's currently playing elsewhere
  (it moves). Zones on another source show a muted "on <other source>" hint.

All state is read live from Home Assistant; external changes appear immediately.

## Install

### Manual (works today)

1. Build the bundle (or grab `dist/binary-moip-source-card.js` from this repo):
   ```bash
   cd binary-moip-card
   npm install
   npm run build
   ```
2. Copy `dist/binary-moip-source-card.js` into your HA config under
   `config/www/`.
3. Add it as a dashboard resource — **Settings → Dashboards → ⋮ → Resources →
   Add resource**:
   - URL: `/local/binary-moip-source-card.js`
   - Type: **JavaScript module**
4. Add the card to a dashboard (see config below).

## Configuration

| Option        | Type                          | Required | Description |
|---------------|-------------------------------|----------|-------------|
| `type`        | string                        | yes      | `custom:binary-moip-source-card` |
| `sources`     | list of `media_player` ids    | yes      | Source entities to show as chips, in order. |
| `zone_groups` | map of label → zone id list   | no       | Organizes the Add-zones picker. If omitted, zones are grouped by HA area (falling back to a single "Zones" group). |
| `title`       | string                        | no       | Optional card header. |

> Zone discovery: when `zone_groups` is omitted, the picker lists every
> `binary_moip` zone `media_player` that isn't one of your configured `sources`.
> For the cleanest picker, either list all your sources in `sources` or define
> `zone_groups`. (A dedicated discovery attribute is a planned enhancement.)

### Example

```yaml
type: custom:binary-moip-source-card
title: Whole-home audio
sources:
  - media_player.ha_streaming_1
  - media_player.record_player
  - media_player.gameroom_appletv
zone_groups:
  Main House:
    - media_player.kitchen
    - media_player.parlor
    - media_player.master_bedroom
  Outdoor:
    - media_player.outdoor_kitchen
    - media_player.outdoor_seating
  Shop:
    - media_player.shop
    - media_player.garage
```

## Development

```bash
npm install
npm run build       # bundle -> dist/binary-moip-source-card.js
npm run build -- --watch
npm test            # unit tests (volume math + service-call handlers)
npm run typecheck
```

The card is a thin Lit rendering layer over pure functions in `src/logic.ts`
(volume math, session derivation, and the `join`/`unjoin`/`volume_set`/transport
call builders), which is where the test coverage lives.
