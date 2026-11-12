# Effects plugin

Adds surface treatments to any layout element. Set its fields as `plugin.effects.<field>` attributes, with `:` for numbers, booleans and bindings: `<div plugin.effects.texture="grain" :plugin.effects.textureOpacity="0.25" />`. The effects are independent and can be combined on one element. Use them instead of hand-written masks, overlay images, `box-shadow` press tricks or rules in `.inject/style.css`.

## Texture
`texture` lays a pattern over the element and its content: `grain` (film noise), `paper` (embossed paper relief), `scanlines` (CRT lines), `halftone` (dots), `grid` (blueprint lines).
- `textureOpacity` (0 to 1, default 0.2), `textureColor` (default black) and `textureBlend` (`multiply` by default; use `screen` with a light colour on dark surfaces, `normal` for a flat pattern).
- `textureSize` (px) is the size of one repetition: line spacing for `scanlines`, dot spacing for `halftone`, cell size for `grid`.
- Put it on the page wrapper for a site-wide grain, or on a card for a local one. It does not work on `<img>`, inputs or other elements without content: wrap them.

## Edge
`edge` cuts the element's outline: `torn` (ripped paper), `zigzag` (receipt), `scallop` (stamp, awning), `wave`, and `notch` (two half-circles bitten out of the left and right sides, like a ticket).
- `edgeSides`: `bottom` (default), `top` or `both`. Ignored by `notch`.
- `edgeSize` (px, default 12): depth of the cut, or radius of the notches.
- The cut removes part of the element, so give it a background and enough padding on the cut sides. It also clips the element's own `box-shadow`: put the shadow on a wrapper with `filter: drop-shadow(...)`.

## Hard shadow
`shadow` is the colour of a solid offset shadow with no blur, the neo-brutalist and sticker look. `shadowX` and `shadowY` (px, default 6) set the offset.
- `:plugin.effects.shadowPress="true"` makes the element pressable: while pressed it moves into its shadow and the shadow closes. Use it on buttons, tabs and cards that act as buttons, instead of `style:active` rules.
- `:plugin.effects.shadowLift="3"` (px, default 0) lifts the element on hover and keyboard focus while its shadow stays in place on the page. Use it on paper and sticker buttons instead of moving them with Motion or `style:hover` transforms. It combines with `shadowPress`: hover lifts, press drops into the shadow.
- Do not also set `box-shadow` in the element's style.

## Text outline
`outline` is the colour of a stroke drawn around the element's text, behind the fill so letters keep their weight. `outlineWidth` (px, default 2). Use it for sticker and comic lettering; for hollow text, also set the text `color` to `transparent`.

## 3D text
`extrude` is the colour of a solid block extruded behind the element's text, the retro poster and arcade look. `extrudeDepth` (px, default 6) is how far it extends and `extrudeAngle` (degrees, default 45) its direction: 0 is right, 90 is down, 45 is down-right. Combine it with `outline` for comic lettering: the block then follows the outlined letters. With `outline` or `gradient` it is drawn with a filter that extrudes everything the element paints, so keep the element to text only, with no background or border.

## Glow
`glow` is the colour of a soft halo, for neon signs, phosphor readouts and lit lamps. `glowSize` (px, default 12) is its spread. `glowOn` is `text` (default, around the letters) or `box` (around the element's box, following its border radius). It stacks with `shadow` and `extrude`.

## Gradient text
`gradient` fills the element's text with a gradient: `chrome` (retro sky-and-horizon chrome), `gold`, `sunset`, or `custom` with `gradientFrom` and `gradientTo`. `gradientAngle` (degrees, default 180) runs top to bottom at 180 and left to right at 90. It replaces the text colour and the element's background image, so put it on the text element itself.

## Rough edges
`rough` (px, e.g. `:plugin.effects.rough="3"`) wobbles everything the element paints, for hand-cut paper, marker lines and rough print. Keep it between 1 and 6, and avoid it on small body text.

## Tilt
`tilt` (degrees, e.g. `:plugin.effects.tilt="-3"`) rotates the element slightly, for stickers, polaroids and pinned notes. On items rendered in a loop, add `:plugin.effects.tiltScatter="true"` so each one leans a different way instead of binding a rotation per item.

## Notes
- The plugin owns `box-shadow`, `text-shadow`, `filter` and `rotate` on elements that use the matching effects: do not also set them in the element's style.
- Colours take any CSS colour. To use a project token, write it as `v-bind(<token id>)`: `plugin.effects.shadow="v-bind(custom/color/ink)"`.
- A sensible default is applied for every field you leave out, so `plugin.effects.edge="torn"` alone is enough.
