import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import type { TElementPanel } from "@luna-park/plugin";
import { LogicType } from "@luna-park/plugin";
import { markRaw } from "vue";

import LEffectsPanel from "@/panels/LEffectsPanel.vue";
import type { TToggleKey } from "@/panels/toggles";
import { toggles } from "@/panels/toggles";
import type { TEffectsOptions } from "@/runtime";
import { defaults, vEffects } from "@/runtime";

import packageDefinition from "../../package.json" with { type: "json" };

function isOff(key: TToggleKey) {
    return (values: TEffectsOptions) => values[key] === undefined;
}

export const effectsPanel: TElementPanel = {
    id: "effects",
    component: markRaw(LEffectsPanel),
    directive: {
        build: { name: "vEffects", from: `${ packageDefinition.name }/runtime` },
        value: vEffects
    },
    filter: (schema) => schema.element !== "slot",
    icon: faPaintRoller,
    label: "Effects",
    properties: {
        edge: LogicType.string({
            name: "Edge",
            default: toggles.edge.value,
            description: "Cuts the element's edges into a shape",
            enum: { notch: "Ticket notches", scallop: "Scallop", torn: "Torn paper", wave: "Wave", zigzag: "Zigzag" },
            optional: true,
            options: { input: "effects/kind", preview: "edge", hidden: isOff("edge") }
        }),
        edgeSides: LogicType.string({
            name: "Edge sides",
            default: defaults.edgeSides,
            enum: { both: "Top and bottom", bottom: "Bottom", top: "Top" },
            options: { hidden: (values: TEffectsOptions) => values.edge === "notch", parent: "edge" }
        }),
        edgeSize: LogicType.number({
            name: "Edge size",
            default: defaults.edgeSize,
            options: { parent: "edge", suffix: "px" }
        }),
        extrude: LogicType.string({
            name: "3D text",
            default: toggles.extrude.value,
            description: "Extrudes the element's text into a solid block of this colour",
            format: "color",
            optional: true,
            options: { hidden: isOff("extrude") }
        }),
        extrudeAngle: LogicType.number({
            name: "3D angle",
            default: defaults.extrudeAngle,
            description: "Direction of the depth: 0 is right, 90 is down",
            options: { parent: "extrude", suffix: "deg" }
        }),
        extrudeDepth: LogicType.number({
            name: "3D depth",
            default: defaults.extrudeDepth,
            options: { parent: "extrude", suffix: "px" }
        }),
        glow: LogicType.string({
            name: "Glow",
            default: toggles.glow.value,
            description: "Soft halo of this colour, for neon and phosphor looks",
            format: "color",
            optional: true,
            options: { hidden: isOff("glow") }
        }),
        glowOn: LogicType.string({
            name: "Glow on",
            default: defaults.glowOn,
            enum: { box: "Box", text: "Text" },
            options: { parent: "glow" }
        }),
        glowSize: LogicType.number({
            name: "Glow size",
            default: defaults.glowSize,
            options: { parent: "glow", suffix: "px" }
        }),
        gradient: LogicType.string({
            name: "Gradient text",
            default: toggles.gradient.value,
            description: "Fills the element's text with a gradient",
            enum: { chrome: "Chrome", custom: "Two colours", gold: "Gold", sunset: "Sunset" },
            optional: true,
            options: { input: "effects/kind", preview: "gradient", hidden: isOff("gradient") }
        }),
        gradientAngle: LogicType.number({
            name: "Gradient angle",
            default: defaults.gradientAngle,
            description: "180 runs top to bottom, 90 left to right",
            options: { parent: "gradient", suffix: "deg" }
        }),
        gradientFrom: LogicType.string({
            name: "Gradient from",
            default: defaults.gradientFrom,
            format: "color",
            options: { hidden: (values: TEffectsOptions) => values.gradient !== "custom", parent: "gradient" }
        }),
        gradientTo: LogicType.string({
            name: "Gradient to",
            default: defaults.gradientTo,
            format: "color",
            options: { hidden: (values: TEffectsOptions) => values.gradient !== "custom", parent: "gradient" }
        }),
        outline: LogicType.string({
            name: "Text outline",
            default: toggles.outline.value,
            description: "Draws a stroke around the element's text",
            format: "color",
            optional: true,
            options: { hidden: isOff("outline") }
        }),
        outlineWidth: LogicType.number({
            name: "Outline width",
            default: defaults.outlineWidth,
            options: { parent: "outline", suffix: "px" }
        }),
        rough: LogicType.number({
            name: "Rough edges",
            default: toggles.rough.value,
            description: "Wobbles the element's outlines for a hand-cut look, by this many pixels",
            optional: true,
            options: { suffix: "px", hidden: isOff("rough") }
        }),
        shadow: LogicType.string({
            name: "Hard shadow",
            default: toggles.shadow.value,
            description: "Solid offset shadow with no blur",
            format: "color",
            optional: true,
            options: { hidden: isOff("shadow") }
        }),
        shadowPress: LogicType.boolean({
            name: "Press down",
            default: defaults.shadowPress,
            description: "The element drops into its shadow while pressed",
            options: { parent: "shadow" }
        }),
        shadowX: LogicType.number({
            name: "Shadow X",
            default: defaults.shadowX,
            options: { parent: "shadow", suffix: "px" }
        }),
        shadowY: LogicType.number({
            name: "Shadow Y",
            default: defaults.shadowY,
            options: { parent: "shadow", suffix: "px" }
        }),
        texture: LogicType.string({
            name: "Texture",
            default: toggles.texture.value,
            description: "Lays a pattern over the element",
            enum: { grain: "Grain", grid: "Grid", halftone: "Halftone", paper: "Paper", scanlines: "Scanlines" },
            optional: true,
            options: { input: "effects/kind", preview: "texture", hidden: isOff("texture") }
        }),
        textureBlend: LogicType.string({
            name: "Texture blend",
            default: defaults.textureBlend,
            enum: ["multiply", "screen", "overlay", "soft-light", "normal"],
            options: { parent: "texture" }
        }),
        textureColor: LogicType.string({
            name: "Texture color",
            default: defaults.textureColor,
            format: "color",
            options: { parent: "texture" }
        }),
        textureOpacity: LogicType.number({
            name: "Texture opacity",
            default: defaults.textureOpacity,
            options: { clamp: true, max: 1, min: 0, parent: "texture", step: 0.05 }
        }),
        textureSize: LogicType.number({
            name: "Texture size",
            default: 240,
            description: "Size of one repetition of the pattern",
            optional: true,
            options: { parent: "texture", suffix: "px" }
        }),
        tilt: LogicType.number({
            name: "Tilt",
            default: toggles.tilt.value,
            description: "Rotates the element slightly",
            optional: true,
            options: { suffix: "deg", hidden: isOff("tilt") }
        }),
        tiltScatter: LogicType.boolean({
            name: "Scatter",
            default: defaults.tiltScatter,
            description: "Repeated items lean different ways, like scattered cards",
            options: { parent: "tilt" }
        })
    }
};
