import { makePlugin } from "@luna-park/plugin";
import { markRaw } from "vue";

import llm from "@/llm.md?raw";
import icon from "@/logo.svg";
import { effectsPanel } from "@/panels/effects";
import LKindInput from "@/panels/LKindInput.vue";
import css from "@/runtime/effects.css?inline";

import packageDefinition from "../package.json" with { type: "json" };

export default makePlugin({
    id: "effects",
    name: "Effects",
    description: "Textures, shaped edges, shadows, glows and text effects for any element.",
    llm,
    build: {
        frontImports: [{ name: packageDefinition.name, version: packageDefinition.version }]
    },
    editor: {
        inputs: {
            kind: markRaw(LKindInput)
        },
        panel: {
            element: [effectsPanel]
        }
    },
    icon,
    inject: {
        css
    }
});
