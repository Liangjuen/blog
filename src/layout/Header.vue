<template>
    <header>
        <div class="center header-inner">
            <RouterLink to="/" class="to-home" title="返回博客首页">
                <span class="myself">Liang JuEn</span>
                <span class="iconfont icon-home"></span>
            </RouterLink>
            <div class="btn-container">
                <span class="iconfont icon-search"></span>
                <span class="iconfont icon-theme" @click.self="openThemeCheckBox" ref="iconTheme"
                    v-closePanel="{ close: closeThemeCheckBox, excludeNode: iconTheme }">
                    <ThemeCheckBox v-model="showThemeCheckBox" className="top-theme-check-box" />
                </span>
                <div class="links">
                    <nav>
                        <router-link v-for="item in navList" :to="item.path" class="link-item"
                            :class="activePath.includes(item.path) ? 'active' : ''">
                            <i class="iconfont" :class="item.icon"></i>
                            {{ item.title }}
                        </router-link>
                    </nav>
                </div>
                <span class="icon-box" @click="openRightScreen">
                    <span class="line top"></span>
                    <span class="line middle"></span>
                    <span class="line bottom"></span>
                </span>
            </div>
        </div>
        <Screen v-model="showRightScreen" />
    </header>
</template>

<script setup lang="ts">
import ThemeCheckBox from '../components/ThemeCheckBox.vue'
import Screen from '../components/Screen.vue'
import useGetNavList, { useActiveNav } from '../hooks/nav'
import { ref } from 'vue'
const iconTheme = ref<Element>()
let showThemeCheckBox = ref<boolean>(false)
let showRightScreen = ref<boolean>(false)
const navList = useGetNavList()
const openThemeCheckBox = () => showThemeCheckBox.value = true
const closeThemeCheckBox = () => showThemeCheckBox.value = false
const openRightScreen = () => showRightScreen.value = true
let activePath = useActiveNav()
</script>

<style scoped>
header {
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: all .5s;
    background-color: rgba(var(--theme-bg-rgb), var(--bg-opacity));
    backdrop-filter: blur(var(--backdrop-filter));
}

.header-inner {
    height: 100%;
    padding: 0 15px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
}

.header-inner {
    font-size: 16px;
}

.header-inner>span,
.link-item {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
}

.icon-box span {
    transition: color 0.4s, top .25s, transform .25s;
}

.header-inner span:hover,
.header-inner a .icon-home:hover,
.link-item:hover,
.active {
    color: var(--color-active);
}

.to-home {
    color: var(--color-text);
    font-weight: 600;
    overflow: hidden;
}

.icon-home {
    display: none;
}

.myself {
    font-size: 24px !important;
}

.btn-container>span {
    position: relative;
    cursor: pointer;
    font-size: 18px !important;
    margin-left: 1rem;
}

.to-home .icon-home:hover {
    color: var(--color-heading);
}

.btn-container,
.links,
.links {
    display: flex;
}

@media screen and (max-width: 700px) {

    .myself,
    .icon-theme,
    .links {
        display: none;
    }

    .icon-home,
    .icon-box {
        display: block !important;
    }
}

.link-item .iconfont {
    margin-right: 1.5px;
}

.icon-box {
    position: relative;
    top: 20px;
    width: 18px;
    height: 16px;
    overflow: hidden;
    display: none;
}

.line {
    width: 18px;
    position: absolute;
    height: 2px;
    background-color: var(--color-text);
    left: 0;
}

.top {
    top: 0;
}

.middle {
    top: 7px;
    transform: translate(8px);
}

.bottom {
    bottom: 0;
    transform: translate(3px);
}

.icon-box:hover .line {
    background-color: var(--color-active);
}

.icon-box:hover .top {
    transform: translate(4px);
}

.icon-box:hover .middle {
    transform: translate(0);
}

.icon-box:hover .bottom {
    transform: translate(7px);
}

.top-theme-check-box {
    position: absolute;
    top: 50px;
    line-height: 42px;
    left: -64px;
    box-shadow: var(--box-shadow);
}
</style>