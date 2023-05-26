<template>
    <div class="article-page-container">
        <PageHeader />
        <section class="articl center" id="more">
            <div class="article-main">
                <p class="summary">{{ summary }}</p>
                <MdEditor :editorId="state.id" v-model="text" theme="dark" previewTheme="github" codeTheme="github"
                    previewOnly @onGetCatalog="onGetCatalog" />
            </div>
            <aside class="article-right">
                <Card v-if="state.docs.length">
                    <template #title>
                        <i class="iconfont icon-dir_outline"></i>
                        <span>目录</span>
                    </template>
                    <template #content>
                        <MdCatalog :offsetTop="80" :editorId="state.id" :scrollElement="scrollElement" theme="dark" />
                    </template>
                </Card>
            </aside>
        </section>
    </div>
</template>

<script setup lang="ts">
import PageHeader from './PageHeader.vue'
import Card from '../../components/Card.vue'
import { useArticleStore } from '@/stores/article'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, reactive } from 'vue'
import API from '@/network/api/index'

import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const MdCatalog = MdEditor.MdCatalog
const scrollElement = document.documentElement
interface Doc {
    text: string,
    level: number
}
const route = useRoute()
const articleStroe = useArticleStore()
let state = reactive<{
    docs: Doc[],
    id: string
}>({
    docs: [],
    id: 'my-editor'
})

let text = ref<string>('')

const getArticleContentByArtId = async () => {
    const data = await API.getArticleDetailByArtId({ id: Number(route.params.id) })
    text.value = data.content_md || ''
}
let summary = computed(() => articleStroe.article.summary)

const onGetCatalog = (list: Doc[]) => {
    state.docs = list
}

onMounted(() => {
    getArticleContentByArtId()
})

</script>

<style>
.articl {
    padding: 15px;
    display: -webkit-box;
    display: flex;
}

.md-editor-dark {
    --md-bk-color: var(--color-text-background) !important;
}

.md-editor-dark article.github-theme {
    --md-theme-color: var(--color-text) !important;
    --md-theme-heading-color: var(--color-text) !important;
}

.github-theme blockquote {
    background-color: var(--color-background-mute);
    border-left: 0.25rem solid var(--color-border-hover);
    display: block;
    line-height: 3;
    margin: 20px 0px;
    padding: 0px 1.2em;
}

.github-theme table tr:nth-child(2n) {
    background: none;
}

.github-theme a {
    color: var(--color-active) !important;
}

.github-theme pre code,
p {
    font-size: 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    border-bottom: none !important;
}

.md-editor-catalog-active>span {
    color: var(--color-active) !important;
}

.md-editor-catalog-link span {
    color: var(--color-text);
}

.md-editor-catalog-link span:hover {
    color: var(--color-active) !important;
}

.article-main {
    flex: 1;
    background-color: var(--color-text-background);
    border-radius: 10px;
    flex-direction: column;
    min-width: 0;
    box-shadow: var(--box-shadow);
    overflow: hidden;
}

.article-main img {
    position: static;
    width: 100%;
    max-width: 900px;
    height: auto;
}

.medium-zoom-image--opened {
    min-height: auto;
    inset: auto;
    min-width: auto;
}

.article-main .summary {
    text-indent: 2rem;
    padding: 15px;
    border-bottom: 2px dashed var(--color-border);
}

.article-right .card {
    min-width: 240px;
}

.article-right {
    margin-left: 15px;
}

.article-right .card {
    position: sticky;
    top: 75px;
    max-height: 640px;
    max-width: 300px;
    overflow-y: auto;
}

.article-right .card .iconfont {
    font-size: 1.2rem;
    margin-right: 1rem;
}

.direc-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 1rem;
    color: var(--color-text);
}

.direc-item .title {
    font-weight: bold;
    font-size: 1rem;
}

.direc-item .link {
    padding: 2px 0;
    font-size: 14px;
    cursor: pointer;
}

.direc-item .link:hover,
.direc-item .active {
    color: var(--color-active);
}

@media screen and (max-width: 900px) {
    .article-right {
        display: none;
    }
}

@media screen and (max-width: 750px) {
    .articl {
        padding: 0;
    }
}
</style>