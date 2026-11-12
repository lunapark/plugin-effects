<template>
    <LSegmented
        v-model="value"
        :options="options"
        small
        wide
    >
        <template
            v-for="kind in kinds"
            :key="kind"
            #[kind]
        >
            <svg
                v-if="effect === 'edge'"
                class="preview"
                preserveAspectRatio="none"
                :viewBox="`0 0 ${ edgeWidth } 20`"
            >
                <path
                    v-if="kind === 'notch'"
                    d="M0 0H60V20H0ZM0 6A4 4 0 0 1 0 14ZM60 6A4 4 0 0 0 60 14Z"
                    fill-rule="evenodd"
                />
                <path
                    v-else-if="kind === 'corners'"
                    d="M0 0H60V20H0ZM5 0A5 5 0 0 1 0 5V0ZM55 0A5 5 0 0 0 60 5V0ZM0 15A5 5 0 0 1 5 20H0ZM60 15A5 5 0 0 0 55 20H60Z"
                    fill-rule="evenodd"
                />
                <template v-else>
                    <rect
                        height="11"
                        :width="edgeWidth"
                    />
                    <path
                        v-for="offset in getTileOffsets(kind as TTiledEdge)"
                        :key="offset"
                        :d="edgeTiles[kind as TTiledEdge].path"
                        :transform="`matrix(1 0 0 -1 ${ offset } 20)`"
                    />
                </template>
            </svg>
            <span
                v-else
                class="preview"
                :class="[effect, kind]"
                :style="{ backgroundImage: effect === 'gradient' ? getGradient(kind) : undefined }"
            />
        </template>
    </LSegmented>
</template>

<script setup lang="ts">
import type { TOption } from "@luna-park/design";
import { LSegmented } from "@luna-park/design";
import type { TSchema } from "@luna-park/plugin";
import { computed } from "vue";

import type { TGradient, TTiledEdge } from "@/runtime";
import { edgeTiles, gradients } from "@/runtime";

const props = defineProps<{
    schema: TSchema;
}>();

const value = defineModel<string>();

const edgeWidth = 60;

const effect = computed(() => props.schema.options!.preview as "edge" | "gradient" | "texture");
const labels = computed(() => props.schema.enum as Record<string, string>);
const kinds = computed(() => Object.keys(labels.value));
const options = computed<Array<TOption>>(() => kinds.value.map((kind) => ({ label: "", title: labels.value[kind], value: kind })));

function getTileOffsets(kind: TTiledEdge) {
    const { width } = edgeTiles[kind];
    return Array.from({ length: Math.ceil(edgeWidth / width) }, (_, index) => index * width);
}

function getGradient(kind: string) {
    return kind === "custom" ? "linear-gradient(135deg, #ffffff 50%, #666666 50%)" : `linear-gradient(180deg, ${ gradients[kind as Exclude<TGradient, "custom">] })`;
}
</script>

<style scoped>
.preview {
    width: 20px;
    height: 10px;
    display: block;
    fill: currentColor;
    border-radius: 1px;

    &.texture {
        background: currentColor;
        mask-size: 4px 4px;

        &.grain {
            mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><filter id='n' x='0' y='0' width='1' height='1'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2.4 0 0 0 -0.7'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
            mask-size: 60px 60px;
        }

        &.paper {
            mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><filter id='n' x='0' y='0' width='1' height='1'><feTurbulence type='fractalNoise' baseFrequency='0.12' numOctaves='4'/><feDiffuseLighting lighting-color='white' surfaceScale='3'><feDistantLight azimuth='45' elevation='60'/></feDiffuseLighting><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -5 0 0 0 4.6'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
            mask-size: 60px 60px;
        }

        &.scanlines {
            mask-image: linear-gradient(#000 50%, #0000 50%);
        }

        &.halftone {
            mask-image: radial-gradient(circle, #000 35%, #0000 40%);
        }

        &.grid {
            mask-image: linear-gradient(#000 1px, #0000 1px), linear-gradient(90deg, #000 1px, #0000 1px);
            mask-size: 5px 5px;
        }
    }
}
</style>
