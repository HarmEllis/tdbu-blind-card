# TDBU Blind Card

[![hacs](https://img.shields.io/badge/HACS-custom-41BDF5.svg)](https://hacs.xyz)

A Lovelace card for **top-down/bottom-up** blinds — the ones that are exposed in
Home Assistant as *two* cover entities, one for the top rail and one for the
bottom rail (MotionBlinds, Coulisse, Somfy, Zigbee TDBU shades, honeycomb/pleated
"duo" blinds, …).

The card shows both shades in one window illustration, with a vertical slider per
rail, a control row and configurable quick actions.

```
┌────────────────────────────────┐
│            Bedroom             │
│   Top    ┌───────────────────┐ │
│    10%   │                   │ │  ← opening
│       ●══╪═══════════════════╡ │  ← top rail
│       │  │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │
│       │  │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ │  fabric
│       ●══╪═══════════════════╡ │  ← bottom rail
│    65%   │                   │ │  ← opening
│  Bottom  └───────────────────┘ │
│  [⚙] [▼] [■] [▲] [♥]           │
│  Quick actions                 │
│  [Open][Daylight][Privacy][Closed] │
└────────────────────────────────┘
```

## Features

- One card per blind instead of two disconnected cover rows.
- Window illustration that follows both rails live while you drag.
- One bar with two handles, sitting exactly where the rails hang in the window,
  so you always drag in the direction the rail travels.
- Handles cannot pass each other — or push each other along, your choice.
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
| `layout` | `between` \| `split` | `between` | `between`: one sheet of fabric spanning from the top rail down to the bottom rail, so the openings are above and below it — the standard top-down/bottom-up blind. `split`: two independent shades closing in from the top and bottom edge, with the view in the middle. See [Blind layout](#blind-layout). |
| `appearance` | `auto` \| `dark` | `auto` | `auto` follows the active theme; `dark` always renders the dark treatment. |
| `display` | `position` \| `coverage` | `position` | `position` shows the Home Assistant cover position, the same as every other cover in HA (100 = open). `coverage` instead shows how much of the window each shade covers, which reads directly off the illustration. |
| `height` | number | `260` | Height of the window illustration in pixels. |
| `step` | number | `1` | Snap step for the sliders, in percent. |
| `invert_top` | bool | `false` | Flip the top rail's direction if the illustration does not match reality. |
| `invert_bottom` | bool | `false` | Same, for the bottom rail. |
| `collision` | `block` \| `push` \| `none` | `block` | What happens when you drag a handle past the other one. `block` stops it against the other handle, `push` drags the other one along (and commands both rails on release), `none` lets them cross. Replaces `prevent_overlap`, which is still honoured when set to `false`. |
| `buttons_target` | `both` \| `top` \| `bottom` | `both` | Which shade(s) the ▲ / ■ / ▼ buttons control. |
| `scene` | `gradient` \| `none` \| image path | `gradient` | What is drawn behind the shades. Any `/local/...` image works. |
| `presets` | list | depends on `layout` | Quick actions, see [Presets](#presets). |
| `favorite` | string \| number | second preset | Preset name (or index) applied by the ♥ button. |
| `presets_label` | string | "Quick actions" | Heading above the quick actions. |
| `top_label` / `bottom_label` | string | "Top" / "Bottom" | Override the slider labels. |
| `language` | string | HA user language | Force the card's language, e.g. `nl`. |
| `remember` | bool | `true` | Set to `false` to stop writing to the position-memory entities. |

### Presets

A preset is a name with an optional `top` and `bottom` position. Tapping one
takes exactly the same path as releasing a handle: one
`cover.set_cover_position` per rail, plus a write to the position memory. Omit
`top` or `bottom` and that rail is left alone. The ♥ button runs the preset named
by `favorite`, or the second one in the list if you don't set it.

```yaml
presets:
  - name: Open
    sub: all open
    top: 0           # cover positions as the card draws them: 100 = open, 0 = closed
    bottom: 100
  - name: Privacy
    sub: bottom half
    top: 50
    bottom: 0
  - name: Movie
    sub: keep the top
    bottom: 20       # omit `top` to leave that rail untouched
favorite: Privacy
```

Preset positions describe the blind the way the card draws it. On a card with
`invert_top` or `invert_bottom` set, the card mirrors them when it sends the
command, so the same preset means the same thing on every card even when one
blind reports its position the other way round.

Because a position number lands somewhere different in each layout, the built-in
defaults differ too.

**`layout: between`** — the fabric spans between the rails, so `top` is how far
the top rail has come down and `bottom` is how far the bottom rail has come up:

Listed from least to most fabric:

| Preset | `top` | `bottom` | Result |
|---|---|---|---|
| Open | 0 | 100 | both rails parked at the head, whole window clear |
| Top strip | 0 | 80 | a 20% strip of fabric along the top, rest clear |
| Band | 50 | 30 | a band of fabric across the middle |
| Privacy | 50 | 0 | fabric over the bottom half |
| Bottom gap | 0 | 20 | fabric over all but the lowest 20% |
| Closed | 0 | 0 | fabric over the whole window |

**`layout: split`** — two independent shades, each closing in from its own edge:

| Preset | `top` | `bottom` | Result |
|---|---|---|---|
| Open | 100 | 100 | both shades rolled away |
| Daylight | 80 | 100 | top shade down 20% |
| Privacy | 100 | 40 | bottom shade up 60% |
| Closed | 0 | 0 | both shades fully drawn |

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

## Blind layout

Two different products both get called "top-down/bottom-up", and they need
opposite drawings. Pick the one that matches your blind with `layout`.

```
layout: between (default)        layout: split
┌──────────┐  ← opening          ┌──────────┐
│          │                     │▒▒▒▒▒▒▒▒▒▒│  top shade
├══════════┤  ← top rail         ├──────────┤  ← top rail
│▒▒▒▒▒▒▒▒▒▒│                     │          │
│▒▒▒▒▒▒▒▒▒▒│  one sheet          │   view   │
├══════════┤  ← bottom rail      ├──────────┤  ← bottom rail
│          │                     │▒▒▒▒▒▒▒▒▒▒│  bottom shade
└──────────┘  ← opening          └──────────┘
```

**`between`** — one sheet of fabric hangs between the two rails. Closed means
the top rail is all the way up *and* the bottom rail all the way down. You open
it from the top by lowering the top rail, and from the bottom by raising the
bottom rail. This is the classic TDBU pleated/honeycomb blind.

**`split`** — two independent shades, one dropping from the top and one rising
from the bottom, leaving a gap in the middle.

In both layouts the two handles sit where their rails sit in the window, so you
always drag in the direction the rail travels. Nothing is sent to the blind
while you drag — each handle sends one `cover.set_cover_position` on release.

## How the geometry works

Home Assistant cover positions are "percent open": `100` = open, `0` = closed.
The card converts that to a rail position measured from the top of the window:

| | `between` | `split` |
|---|---|---|
| top rail | `top position / 100` | `(100 − top position) / 100` |
| bottom rail | `(100 − bottom position) / 100` | `bottom position / 100` |

Fabric is then drawn between the rails (`between`) or outside them (`split`).

If a rail moves the opposite way from what the illustration shows, your
integration reports that cover's position the other way round — set `invert_top`
and/or `invert_bottom` to mirror just that rail. If instead the *fabric* is on
the wrong side of the rails, you want the other `layout`.

## Contributing translations

Copy the `en` block in `TRANSLATIONS` at the top of `dist/tdbu-blind-card.js`,
translate the values, and open a pull request. Missing keys fall back to English.

## License

MIT
