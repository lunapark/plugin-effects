import type { Directive } from "vue";

export type TTexture = "grain" | "paper" | "scanlines" | "halftone" | "grid";
export type TEdge = "torn" | "zigzag" | "scallop" | "wave" | "notch";
export type TEdgeSides = "top" | "bottom" | "both";
export type TGradient = "chrome" | "gold" | "sunset" | "custom";
export type TGlowTarget = "text" | "box";

export type TEffectsOptions = {
    edge?: TEdge;
    edgeSides?: TEdgeSides;
    edgeSize?: number;
    extrude?: string;
    extrudeAngle?: number;
    extrudeDepth?: number;
    glow?: string;
    glowOn?: TGlowTarget;
    glowSize?: number;
    gradient?: TGradient;
    gradientAngle?: number;
    gradientFrom?: string;
    gradientTo?: string;
    outline?: string;
    outlineWidth?: number;
    rough?: number;
    shadow?: string;
    shadowLift?: number;
    shadowPress?: boolean;
    shadowX?: number;
    shadowY?: number;
    texture?: TTexture;
    textureBlend?: string;
    textureColor?: string;
    textureOpacity?: number;
    textureSize?: number;
    tilt?: number;
    tiltScatter?: boolean;
};

type TEdgeTile = { path: string; ratio: number; width: number; };
type TDefaults = Required<Omit<TEffectsOptions, "edge" | "extrude" | "glow" | "gradient" | "outline" | "rough" | "shadow" | "texture" | "textureSize" | "tilt">>;
type TOptions = TEffectsOptions & TDefaults;
type TLayers = { boxShadow: Array<string>; filter: Array<string>; liftedShadow: Array<string>; pressedShadow: Array<string>; textShadow: Array<string>; };

const prefix = "lpfx";

export const defaults: TDefaults = {
    edgeSides: "bottom",
    edgeSize: 12,
    extrudeAngle: 45,
    extrudeDepth: 6,
    glowOn: "text",
    glowSize: 12,
    gradientAngle: 180,
    gradientFrom: "#ffffff",
    gradientTo: "#000000",
    outlineWidth: 2,
    shadowLift: 0,
    shadowPress: false,
    shadowX: 6,
    shadowY: 6,
    textureBlend: "multiply",
    textureColor: "#000000",
    textureOpacity: 0.2,
    tiltScatter: false
};

const textureSizes: Record<TTexture, number> = { grain: 240, grid: 24, halftone: 6, paper: 400, scanlines: 3 };

export const gradients: Record<Exclude<TGradient, "custom">, string> = {
    chrome: "#f5fbff 0%, #9fd3ff 22%, #3d7fd6 44%, #1b2a5c 50%, #5b2a86 54%, #ff7ac6 68%, #ffb347 84%, #fff1c9 100%",
    gold: "#fff6c2 0%, #f5c542 35%, #b8770f 55%, #ffe38a 75%, #8a5a00 100%",
    sunset: "#ffd23f 0%, #ff7a2f 35%, #ff3d81 68%, #7b2ff7 100%"
};

const scatter = [1, -0.6, 0.4, -1, 0.7, -0.3];

export const edgeTiles: Record<Exclude<TEdge, "notch">, TEdgeTile> = {
    scallop: { path: "M0 10A10 10 0 0 1 20 10Z", ratio: 2, width: 20 },
    torn: {
        path: "M0 10V4L6 6L11 2L19 5L24 1L33 4L41 3L47 7L55 2L62 5L70 1L78 6L85 3L93 5L99 0L108 4L115 2L122 6L131 3L138 7L146 2L154 5L161 1L169 4L177 6L184 2L192 5L200 4V10Z",
        ratio: 20,
        width: 200
    },
    wave: { path: "M0 10V5Q10 -5 20 5T40 5V10Z", ratio: 4, width: 40 },
    zigzag: { path: "M0 10L10 0L20 10Z", ratio: 2, width: 20 }
};

function getTile({ path, width }: TEdgeTile, flipped: boolean) {
    const transform = flipped ? " transform='matrix(1 0 0 -1 0 10)'" : "";
    return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${ width } 10' preserveAspectRatio='none'><path${ transform } d='${ path }'/></svg>")`;
}

function setVariables(element: HTMLElement, variables: Record<string, string>) {
    for (const [name, value] of Object.entries(variables)) {
        element.style.setProperty(`--${ prefix }-${ name }`, value);
    }
}

function applyTexture(element: HTMLElement, options: TOptions, texture: TTexture) {
    if (getComputedStyle(element).position === "static") {
        element.classList.add(`${ prefix }-anchor`);
    }

    element.classList.add(`${ prefix }-texture`, `${ prefix }-texture-${ texture }`);
    setVariables(element, {
        "texture-blend": options.textureBlend,
        "texture-color": options.textureColor,
        "texture-opacity": String(options.textureOpacity),
        "texture-size": `${ options.textureSize ?? textureSizes[texture] }px`
    });
}

function applyEdge(element: HTMLElement, { edgeSides, edgeSize }: TDefaults, edge: TEdge) {
    if (edge === "notch") {
        element.classList.add(`${ prefix }-notch`);
        setVariables(element, { "edge-size": `${ edgeSize }px` });
        return;
    }

    const tile = edgeTiles[edge];
    const top = edgeSides !== "bottom";
    const bottom = edgeSides !== "top";

    element.classList.add(`${ prefix }-edge`);
    setVariables(element, {
        "edge-bottom": bottom ? getTile(tile, true) : "none",
        "edge-inset-bottom": bottom ? `${ edgeSize - 1 }px` : "0px",
        "edge-inset-top": top ? `${ edgeSize - 1 }px` : "0px",
        "edge-size": `${ edgeSize }px`,
        "edge-top": top ? getTile(tile, false) : "none",
        "edge-width": `${ edgeSize * tile.ratio }px`
    });
}

function applyShadow(element: HTMLElement, options: TOptions, layers: TLayers, color: string) {
    const x = `${ options.shadowX }px`;
    const y = `${ options.shadowY }px`;

    layers.boxShadow.push(`${ x } ${ y } 0 0 ${ color }`);
    layers.pressedShadow.push(`0 0 0 0 ${ color }`);
    element.classList.toggle(`${ prefix }-press`, options.shadowPress);
    setVariables(element, { "shadow-x": x, "shadow-y": y });

    if (options.shadowLift > 0) {
        const lift = options.shadowLift;

        layers.liftedShadow.push(`${ options.shadowX + lift }px ${ options.shadowY + lift }px 0 0 ${ color }`);
        element.classList.add(`${ prefix }-lift`);
        setVariables(element, { "shadow-lift": `${ lift }px` });
    }
}

function applyOutline(element: HTMLElement, { outlineWidth }: TDefaults, color: string) {
    element.classList.add(`${ prefix }-outline`);
    setVariables(element, { "outline-color": color, "outline-width": `${ outlineWidth }px` });
}

function getOffset(radians: number, distance: number) {
    return { x: Math.round(Math.cos(radians) * distance), y: Math.round(Math.sin(radians) * distance) };
}

function getDoublingSteps(depth: number) {
    const steps: Array<number> = [];

    for (let covered = 0; covered < depth; covered += steps.at(-1)!) {
        steps.push(Math.min(covered + 1, depth - covered));
    }

    return steps;
}

function isFilled(options: TOptions) {
    return !options.outline && !options.gradient;
}

function applyExtrude(options: TOptions, layers: TLayers, color: string) {
    const radians = options.extrudeAngle * Math.PI / 180;

    if (isFilled(options)) {
        for (let distance = 1; distance <= Math.ceil(options.extrudeDepth); distance++) {
            const { x, y } = getOffset(radians, distance);
            layers.textShadow.push(`${ x }px ${ y }px 0 ${ color }`);
        }

        return;
    }

    let covered = 0;
    let previous = { x: 0, y: 0 };

    for (const step of getDoublingSteps(options.extrudeDepth)) {
        covered += step;

        const target = getOffset(radians, covered);
        layers.filter.push(`drop-shadow(${ target.x - previous.x }px ${ target.y - previous.y }px 0 ${ color })`);
        previous = target;
    }
}

function applyGlow(options: TOptions, layers: TLayers, color: string) {
    const glow = `0 0 ${ options.glowSize }px ${ color }`;

    if (options.glowOn === "box") {
        layers.boxShadow.push(glow);
        layers.pressedShadow.push(glow);
        layers.liftedShadow.push(glow);
    }
    else if (isFilled(options)) {
        layers.textShadow.push(glow);
    }
    else {
        layers.filter.push(`drop-shadow(${ glow })`);
    }
}

function applyGradient(element: HTMLElement, options: TOptions, gradient: TGradient) {
    const stops = gradient === "custom" ? `${ options.gradientFrom }, ${ options.gradientTo }` : gradients[gradient];

    element.classList.add(`${ prefix }-gradient`);
    setVariables(element, { gradient: `linear-gradient(${ options.gradientAngle }deg, ${ stops })` });
}

function applyRough(element: HTMLElement, layers: TLayers, rough: number) {
    const id = `${ prefix }-rough-${ rough }`;
    const { body } = element.ownerDocument;

    if (!body.querySelector(`#${ CSS.escape(id) }`)) {
        body.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="${ id }"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="${ rough }" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`);
    }

    layers.filter.unshift(`url(#${ CSS.escape(id) })`);
}

function applyTilt(element: HTMLElement, { tiltScatter }: TOptions, tilt: number) {
    const index = [...element.parentElement!.children].indexOf(element);
    const factor = tiltScatter ? scatter[index % scatter.length]! : 1;

    element.classList.add(`${ prefix }-tilt`);
    setVariables(element, { tilt: `${ tilt * factor }deg` });
}

function applyLayers(element: HTMLElement, layers: TLayers) {
    const lists = { "box-shadow": layers.boxShadow, "box-shadow-lifted": layers.liftedShadow, "box-shadow-pressed": layers.pressedShadow, "filter": layers.filter, "text-shadow": layers.textShadow };

    for (const [name, list] of Object.entries(lists)) {
        if (list.length) {
            element.classList.add(`${ prefix }-${ name }`);
            setVariables(element, { [name]: list.join(name === "filter" ? " " : ", ") });
        }
    }
}

function clear(element: HTMLElement) {
    element.classList.remove(...[...element.classList].filter((name) => name.startsWith(`${ prefix }-`)));

    for (const property of [...element.style].filter((name) => name.startsWith(`--${ prefix }-`))) {
        element.style.removeProperty(property);
    }
}

function apply(element: HTMLElement, value: TEffectsOptions) {
    const options = { ...defaults, ...value };
    const layers: TLayers = { boxShadow: [], filter: [], liftedShadow: [], pressedShadow: [], textShadow: [] };

    clear(element);

    if (options.texture) {
        applyTexture(element, options, options.texture);
    }

    if (options.edge) {
        applyEdge(element, options, options.edge);
    }

    if (options.shadow) {
        applyShadow(element, options, layers, options.shadow);
    }

    if (options.extrude) {
        applyExtrude(options, layers, options.extrude);
    }

    if (options.glow) {
        applyGlow(options, layers, options.glow);
    }

    if (options.outline) {
        applyOutline(element, options, options.outline);
    }

    if (options.gradient) {
        applyGradient(element, options, options.gradient);
    }

    if (options.rough) {
        applyRough(element, layers, options.rough);
    }

    if (options.tilt) {
        applyTilt(element, options, options.tilt);
    }

    applyLayers(element, layers);
}

export const vEffects: Directive<HTMLElement, TEffectsOptions> = {
    mounted: (element, { value }) => apply(element, value),
    unmounted: clear,
    updated: (element, { value }) => apply(element, value)
};
