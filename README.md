# 🎨 Effects plugin for Luna Park

**Give any element a surface**: paper grain, torn edges, hard shadows, glows, outlined, 3D and chrome lettering. Everything is set from a single **Effects** panel in the inspector, without masks, overlay images or custom CSS.

## ✨ What you get

| | |
|---|---|
| 🌫️ **Textures** | Grain, paper, scanlines, halftone and grid, laid over any element in your own colour. |
| ✂️ **Shaped edges** | Torn paper, zigzag, scallop, wave and ticket notches. |
| 🧱 **Hard shadows** | Solid offset shadows, with an optional press-down effect for buttons. |
| 🔤 **Text outlines** | A stroke around your text that keeps the letters readable. |
| 🧊 **3D text** | Extrude your lettering into a solid block, in any direction. |
| 💡 **Glow** | A soft halo around text or boxes, for neon and phosphor looks. |
| 🌈 **Gradient text** | Chrome, gold, sunset or your own two colours. |
| 🖍️ **Rough edges** | Wobble outlines for a hand-cut, hand-drawn feel. |
| 📐 **Tilt** | Lean an element, or scatter a whole list of cards. |

## 🚀 Getting started

1. In Luna Park, open **Library → Install Plugins**, search for **Effects** and install it.
2. Select an element and switch on the **Effects** panel in the inspector.
3. Click an effect in the row of icons at the top of the panel to switch it on, and again to switch it off. Each one brings its own options, grouped below it. Textures, edges and gradient presets are picked from previews.

## 🎛️ Effects

| Effect | Options |
|---|---|
| **Texture** | **Texture opacity**, **Texture color**, **Texture blend** (`multiply`, `screen`, `overlay`, `soft-light`, `normal`) and, optionally, **Texture size** (the size of one repetition). |
| **Edge** | **Edge sides** (bottom, top or both) and **Edge size** (depth of the cut). **Ticket notches** bite a half-circle out of the left and right sides. |
| **Hard shadow** | The shadow colour, **Shadow X** / **Shadow Y** for the offset, and **Press down** to make the element sink into its shadow while pressed. |
| **Text outline** | The stroke colour and **Outline width**. |
| **3D text** | The block colour, **3D depth** and **3D angle** (0 is right, 90 is down). |
| **Glow** | The halo colour, **Glow size** and **Glow on** (text or box). |
| **Gradient text** | A preset (chrome, gold, sunset) or **Two colours** with **Gradient from** / **Gradient to**, and **Gradient angle**. |
| **Rough edges** | The strength of the wobble, in pixels. |
| **Tilt** | The angle, and **Scatter** to make repeated items lean different ways. |

> [!TIP]
> - On a dark surface, pick a light **Texture color** and the `screen` blend.
> - An edge cuts into the element: give it a background and some padding on the cut sides. It also clips the element's own shadow, so put a `drop-shadow` filter on a parent instead.
> - Textures need an element with content. To texture an image, wrap it in a block and put the texture on the block.

## 📦 In your deployed app

When you build your project:

- **Runtime**: the plugin is added to your frontend dependencies automatically.
- **Directive**: elements with effects use the `v-effects` directive from `@luna-park/plugin-effects/runtime`.
- **Styles**: a small stylesheet (classes prefixed with `lpfx-`) is appended to your app's CSS.

## 🛠️ Development

```bash
pnpm install
pnpm build      # build the plugin
pnpm dev        # rebuild on change
pnpm preview    # serve it to the Luna Park editor (http://127.0.0.1:2084)
```

The package ships two entries:

- `@luna-park/plugin-effects`: the editor plugin (Effects panel and stylesheet).
- `@luna-park/plugin-effects/runtime`: the browser runtime used by the generated app (`vEffects`).

---

Made with 💙 by [Luna Park](https://luna-park.app).
