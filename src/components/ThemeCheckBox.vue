<template>
    <Transition>
        <div class="theme-checkbox" v-if="modelValue" :class="className">
            <span :class="theme == item ? 'active' : ''" @click="checkTheme(item)" v-for="item in themeList">
                {{ item }}
            </span>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIndexStore } from '../stores/index'
defineProps<{
    modelValue: boolean,
    className?: string
}>()
type Themes = 'dark' | 'light' | 'auto'
const indexStore = useIndexStore()
let theme = computed(() => indexStore.theme)
const themeList: Themes[] = ['light', 'dark', 'auto']
const checkTheme = (theme: Themes) => indexStore.theme = theme

</script>

<style scoped>
.theme-checkbox {
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    background-color: var(--color-text-background);
    overflow: hidden;
}

.theme-checkbox>span {
    flex: 1;
    padding: 4px;
    width: 52px;
    text-align: center;
    cursor: pointer;
    color: var(--color-text);
    transition: all 0.3s;
}

.theme-checkbox>span:hover {
    color: var(--color-border-hover);
}

.theme-checkbox .active {
    background-color: var(--color-active);
    color: var(--color-avtive-text) !important;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>