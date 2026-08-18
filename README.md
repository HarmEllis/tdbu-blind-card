# TDBU Blind Card

[![hacs](https://img.shields.io/badge/HACS-custom-41BDF5.svg)](https://hacs.xyz)

A Lovelace card for **top-down/bottom-up** blinds — the ones that are exposed in
Home Assistant as *two* cover entities, one for the top rail and one for the
bottom rail (MotionBlinds, Coulisse, Somfy, Zigbee TDBU shades, honeycomb/pleated
"duo" blinds, …).

The card shows both shades in one window illustration, with a vertical slider per
rail, a control row and configurable quick actions.

```
┌──────────────────────────────┐
│           Bedroom            │
│  Top    ┌──────────────────┐ │
│  10%    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  ← top shade
│   ●     │                  │ │
│   │     │      (view)      │ │
│  Bottom │                  │ │
│  65%    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  ← bottom shade
│   ●     └──────────────────┘ │
│  [⚙] [▼] [■] [▲] [♥]         │
│  Quick actions               │
│  [Open][Daylight][Privacy][Closed] │
└──────────────────────────────┘
```

## Features

- One card per blind instead of two disconnected cover rows.
- Window illustration that follows both rails live while you drag.
- Sliders map to the **physical rail position**: the top thumb is where the top
  rail hangs, the bottom thumb is where the bottom rail sits.
- Rails cannot cross (optional).
- Open / stop / close for both shades, plus a favourite button.
- Quick-action presets, fully configurable.
- **Position memory** for integrations that never report a position (see below).
- Visual editor; UI strings follow the Home Assistant user's language
  (English, Dutch, German, French — contributions welcome).
- No dependencies, no build step, works with light and dark themes.

## Installation

### HACS (recommended)

1. HACS → three-dot menu → **Custom repositories**.
2. Add `https://github.com/HarmEllis/tdbu-blind-card`, category **Dashboard**.
3. Install **TDBU Blind Card**, then hard-refresh the browser (Ctrl/Cmd + Shift + R).

### Manual

1. Copy `dist/tdbu-blind-card.js` to `<config>/www/`.
2. Settings → Dashboards → three-dot menu → **Resources** → add
   `/local/tdbu-blind-card.js` as **JavaScript module**.

## Usage

```yaml
type: custom:tdbu-blind-card
name: Bedroom
top_entity: cover.bedroom_blind_top
bottom_entity: cover.bedroom_blind_bottom
```

Everything else is optional.

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `top_entity` | entity | **required** | Cover entity of the top rail. |
| `bottom_entity` | entity | **required** | Cover entity of the bottom rail. |
| `name` | string | top entity's name, minus a trailing "top" | Card title. Use `""` to hide. |
| `top_position_entity` | entity | — | `input_number` (or `number`) holding the last known top position. See [Position memory](#position-memory). |
| `bottom_position_entity` | entity | — | Same, for the bottom rail. |
| `appearance` | `auto` \| `dark` | `auto` | `auto` follows the active theme; `dark` always renders the dark treatment. |
| `display` | `position` \| `coverage` | `position` | `position` shows the Home Assistant cover position, the same as every other cover in HA (100 = open). `coverage` instead shows how much of the window each shade covers, which reads directly off the illustration. |
| `height` | number | `260` | Height of the window illustration in pixels. |
| `step` | number | `1` | Snap step for the sliders, in percent. |
| `invert_top` | bool | `false` | Flip the top rail's direction if the illustration does not match reality. |
| `invert_bottom` | bool | `false` | Same, for the bottom rail. |
| `prevent_overlap` | bool | `true` | Stop the top rail from being dragged past the bottom rail. |
| `buttons_target` | `both` \| `top` \| `bottom` | `both` | Which shade(s) the ▲ / ■ / ▼ buttons control. |
| `scene` | `gradient` \| `none` \| image path | `gradient` | What is drawn behind the shades. Any `/local/...` image works. |
| `presets` | list | Open / Daylight / Privacy / Closed | Quick actions, see below. |
| `favorite` | string \| number | second preset | Preset name (or index) applied by the ♥ button. |
| `presets_label` | string | "Quick actions" | Heading above the quick actions. |
| `top_label` / `bottom_label` | string | "Top" / "Bottom" | Override the slider labels. |
| `language` | string | HA user language | Force the card's language, e.g. `nl`. |
| `remember` | bool | `true` | Set to `false` to stop writing to the position-memory entities. |

### Presets

```yaml
presets:
  - name: Open
    sub: all open
    top: 100
    bottom: 100
  - name: Daylight
    sub: top 20%
    top: 80          # positions are raw cover positions: 100 = open, 0 = closed
    bottom: 100
  - name: Movie
    sub: bottom 80%
    bottom: 20       # omit `top` to leave that shade untouched
favorite: Daylight
```

## Position memory

Some blinds only take commands and never report back — the MotionBlinds
Bluetooth integration (`motionblinds_ble`) deliberately sets the position to
`unknown`, because a blind can also be moved with its physical remote and Home
Assistant has no way to know. The card would then always show "—".

Give the card a helper per rail and it will remember the last commanded position:

1. Create two `input_number` helpers per blind (min `0`, max `100`, step `1`,
   unit `%`). **Do not set an initial value** — that would wipe the stored value
   on every restart.
2. Point the card at them:

```yaml
type: custom:tdbu-blind-card
name: Bedroom
top_entity: cover.bedroom_blind_top
bottom_entity: cover.bedroom_blind_bottom
top_position_entity: input_number.bedroom_blind_top_position
bottom_position_entity: input_number.bedroom_blind_bottom_position
```

The card writes the helper whenever it commands a position (slider, preset,
open, close) and falls back to it whenever the cover itself reports no position.
A remembered value is shown with a dotted underline, so you can tell it apart
from a measured one.

Positions set outside the card (automations, scripts, the more-info dialog) can
be mirrored into the same helpers with one automation — see
[`examples/position-memory.yaml`](examples/position-memory.yaml). If someone uses
the physical remote, the remembered value will be wrong until the blind is
commanded again; correct it by editing the helper directly.

## How the geometry works

Home Assistant cover positions are "percent open": `100` = open, `0` = closed.
The card converts that to rail positions:

- top rail distance from the top of the window = `(100 − top position) / 100`
- bottom rail distance from the top of the window = `bottom position / 100`

The fabric is drawn from the top edge down to the top rail, and from the bottom
rail down to the bottom edge. If your blind runs the other way round, set
`invert_top` and/or `invert_bottom`.

## Contributing translations

Copy the `en` block in `TRANSLATIONS` at the top of `dist/tdbu-blind-card.js`,
translate the values, and open a pull request. Missing keys fall back to English.

## License

MIT
