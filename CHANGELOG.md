# Changelog

## 1.0.0

- Initial release.
- Window illustration with independent top and bottom shades.
- Two vertical sliders that map to the physical rail positions.
- Open / stop / close / favourite control row and configurable quick actions.
- Optional position memory for integrations that never report a position
  (for example `motionblinds_ble`).
- Visual editor and UI strings in English, Dutch, German and French.

## 1.1.0

- Added `layout`, distinguishing a blind with one sheet of fabric spanning
  between the rails (`between`, now the default) from two independent shades
  with the view in the middle (`split`, the previous behaviour).
- `invert_top` / `invert_bottom` are now a pure mirror of a single rail, on top
  of whichever layout is selected.
- Simplified the `coverage` display to the complement of the cover position.

## 1.2.0

- Replaced the two separate sliders with a single bar carrying two handles, so
  each handle sits exactly where its rail hangs in the window.
- Larger, grippable 30px handles; the value labels are fixed above and below the
  bar.
- Added `collision` (`block` / `push` / `none`), replacing `prevent_overlap`.
- Dragging still sends nothing; each handle commands its rail once on release.

## 1.3.0

- The built-in presets now depend on `layout`. The previous set was written for
  `split`; under `between` two of the four asked the rails to cross, which the
  collision clamp silently turned into a meaningless position.
- `between` ships with Open / Privacy / Bottom gap / Band / Closed.
