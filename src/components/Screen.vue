<template>
    <Transition name="screen">
        <div class="screen" ref="screen" v-if="modelValue" @click.self="close"></div>
    </Transition>
    <Transition name="menu">
        <div v-if="showMenuContainer" class="menu-container">
            <div class="card">
                <nav>
                    <router-link v-for="item in navList" :to="item.path" class="nav-item" @click="close"
                        :class="activePath.includes(item.path) ? 'active' : ''"> <i class="iconfont"
                            :class="item.icon + ' ' + (activePath.includes(item.path) ? 'active' : '')"></i>
                        {{ item.title }}
                    </router-link>
                </nav>
                <ThemeCheckBox v-model="showMenuContainer" />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
import useGetNavList, { useActiveNav } from '../hooks/nav'
import ThemeCheckBox from './ThemeCheckBox.vue'
const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const screen = ref<Element>()
let showMenuContainer = ref<boolean>(false)
const navList = useGetNavList()

const close = () => {
    emit('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
    showMenuContainer.value = val
}, {
    immediate: true
})


let activePath = useActiveNav()


</script>

<style scoped>
.screen {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .7);
    z-index: 199;
    overflow-y: auto;
    overflow-x: hidden;
}

.menu-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 20rem;
    height: 100vh;
    background-color: var(--color-background-main);
    padding: 1rem;
    z-index: 200;
}

.card {
    padding: 1rem 4px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--color-background-soft);
}

nav {
    margin-bottom: 30px;
}

.nav-item {
    /* color: var(--color-text); */
    display: block;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
    transition: all 0.3s;
    cursor: pointer;
}

.nav-item:hover {
    color: var(--color-border-hover);
    border-bottom: 1px solid var(--color-border-hover);
}

.menu-enter-active,
.menu-leave-active {
    transition: transform 0.5s ease, opacity 0.3s;
}

.menu-enter-from,
.menu-leave-to {
    transform: translate(100%);
    opacity: 0;
}

.menu-enter-to,
.menu-leave-from {
    transform: translate(0);
    opacity: 1;
}

.screen-enter-active,
.screen-leave-active {
    transition: opacity 0.5s ease;
}

.screen-enter-from,
.screen-leave-to {
    opacity: 0;
}
</style>