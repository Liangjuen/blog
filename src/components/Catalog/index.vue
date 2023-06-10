<template>
    <div class="md-catalog">
        <div class="catalog-link" v-for="link in articleStore.catalog"
            :class="(state.activeLink == link.text ? 'active' : '') + (state.minLevel == (link.level + 1) ? 'ml-14' : (state.minLevel == (link.level + 2)) ? 'ml-26' : '')">
            <span class="catalog-link-item" @click.self="clickLink(link)">
                {{ link.text }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Links, Link } from './type'
import { reactive, onMounted, watch } from 'vue';
import { useArticleStore } from '@/stores/article'
import CataLog from '@/components/Catalog/index.vue';
const articleStore = useArticleStore()
const props = defineProps<{
    editorId: string
}>()
let catalogList: Links = [
    { text: '测试1', level: 1 },
    { text: '测试2', level: 2 },
    { text: '测试3', level: 3 },
    { text: '测试4', level: 2 },
    { text: '测试5', level: 1 },
]
let state = reactive<{
    topLink: string,
    activeLink: string,
    maxLevel: number,
    minLevel: number,
}>({
    topLink: '',
    activeLink: '',
    maxLevel: 1,
    minLevel: 1
})

const clickLink = (link: Link) => {

}
watch(() => articleStore.catalog, (catalog: Links) => {
    if (!catalog.length) return
    let max = catalog[0].level
    let min = catalog[0].level
    catalog.forEach(item => {
        if (max < item.level) max = item.level
        if (min > item.level) min = item.level
    })
    state.maxLevel = max
    state.minLevel = min
})
</script>

<style>
.catalog-link {
    cursor: pointer;
}

.catalog-link-item {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    line-height: 2em;
    margin: 4px 0;
    padding: 4px 10px;
    border-radius: 8px;
}

.catalog-link-item:hover,
.catalog-link .active {
    color: var(--vt-c-white);
    background-color: var(--color-active);
}

.ml-14 {
    margin-left: 14px;
}

.ml-26 {
    margin-left: 26px;
}
</style>