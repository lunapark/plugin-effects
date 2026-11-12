<template>
    <div class="effects-panel">
        <LEffectsCard
            :hint="active.length ? active.join(', ') : 'None'"
            :icon="faPaintRoller"
            title="Effects"
        >
            <div class="toggles">
                <div
                    v-for="key in toggleOrder"
                    :key="key"
                    :aria-label="toggles[key].title"
                    :aria-pressed="modelValue[key] !== undefined"
                    class="toggle"
                    :class="{ selected: modelValue[key] !== undefined }"
                    role="button"
                    :title="toggles[key].title"
                    @click="emits('update:modelValue', { ...modelValue, [key]: modelValue[key] === undefined ? toggles[key].value : undefined })"
                >
                    <LIcon
                        class="icon"
                        :icon="toggles[key].icon"
                    />
                </div>
            </div>
        </LEffectsCard>
    </div>
</template>

<script setup lang="ts">
import { faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { LIcon } from "@luna-park/design";
import type { TElementPanelProps } from "@luna-park/plugin";
import { computed } from "vue";

import LEffectsCard from "@/panels/LEffectsCard.vue";
import { toggleOrder, toggles } from "@/panels/toggles";
import type { TEffectsOptions } from "@/runtime";

const props = defineProps<TElementPanelProps<TEffectsOptions>>();

const emits = defineEmits<(e: "update:modelValue", value: TEffectsOptions) => void>();

const active = computed(() => toggleOrder
    .filter((key) => props.modelValue[key] !== undefined)
    .map((key) => toggles[key].title));
</script>

<style scoped>
.effects-panel {
    margin: var(--length-xs);

    .toggles {
        display: flex;
        gap: 1px;
        overflow: hidden;
        background: var(--color-background-1);
        border: 1px solid var(--color-background-1);
        border-radius: var(--length-radius-xs);
    }

    .toggle {
        flex: 1 1 0;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-background-1);
        cursor: pointer;
        transition: var(--transition-fast);

        .icon {
            font-size: var(--font-icon-xs);
            color: var(--color-content-litest);
        }

        &:hover {
            background-color: var(--color-background-2);
        }

        &.selected {
            background-color: var(--color-primary-dark);

            .icon {
                color: var(--color-content-liter);
            }
        }
    }
}
</style>
