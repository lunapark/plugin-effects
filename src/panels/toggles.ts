import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faChessBoard, faClone, faCube, faFont, faLightbulb, faPalette, faRotate, faScissors, faWaveSquare } from "@fortawesome/free-solid-svg-icons";

import type { TEffectsOptions } from "@/runtime";

export type TToggleKey = "edge" | "extrude" | "glow" | "gradient" | "outline" | "rough" | "shadow" | "texture" | "tilt";

type TToggle<TKey extends TToggleKey> = { icon: IconDefinition; title: string; value: NonNullable<TEffectsOptions[TKey]>; };

export const toggleOrder: Array<TToggleKey> = ["texture", "edge", "shadow", "glow", "outline", "extrude", "gradient", "rough", "tilt"];

export const toggles: { [TKey in TToggleKey]: TToggle<TKey> } = {
    edge: { icon: faScissors, title: "Edge", value: "torn" },
    extrude: { icon: faCube, title: "3D text", value: "#000000" },
    glow: { icon: faLightbulb, title: "Glow", value: "#ff4fc8" },
    gradient: { icon: faPalette, title: "Gradient text", value: "chrome" },
    outline: { icon: faFont, title: "Text outline", value: "#000000" },
    rough: { icon: faWaveSquare, title: "Rough edges", value: 3 },
    shadow: { icon: faClone, title: "Hard shadow", value: "#000000" },
    texture: { icon: faChessBoard, title: "Texture", value: "grain" },
    tilt: { icon: faRotate, title: "Tilt", value: -3 }
};
