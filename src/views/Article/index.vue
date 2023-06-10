<template>
    <div class="article-page-container">
        <PageHeader />
        <section class="article center" id="more">
            <div class="article-main">
                <p class="summary">{{ summary }}</p>
                <MdPreview :editorId="state.editorId" v-model="text" :theme="theme" :previewTheme="state.previewTheme"
                    codeTheme="github" @onGetCatalog="onGetCatalog" />
                <div class="prev-next">
                    <div class="pager">
                        <router-link :to="{ name: 'Article', params: { id: prevPage.id } }" class="pager-link prev"
                            v-if="prevPage">
                            <span class="desc">Previous page</span>
                            <span class="title">{{ prevPage.title }}</span>
                        </router-link>
                    </div>
                    <div class="pager">
                        <router-link :to="{ name: 'Article', params: { id: nextPage.id } }" class="pager-link next"
                            v-if="nextPage">
                            <span class="desc">Next page</span>
                            <span class="title">{{ nextPage.title }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <aside class="article-right">
                <Card v-if="articleStroe.catalog.length">
                    <template #title>
                        <i class="iconfont icon-dir_outline"></i>
                        <span>目录</span>
                    </template>
                    <template #content>
                        <MdCatalog :offsetTop="80" :scrollElementOffsetTop="75" :editorId="state.editorId"
                            :scrollElement="scrollElement" />
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
import { useIndexStore } from '../../stores/index'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, reactive } from 'vue'
import API from '@/network/api/index'
import { MdPreview, MdCatalog, config } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import ancher from 'markdown-it-anchor'
config({
    markdownItConfig(mdit) {
        mdit.use(ancher, {
            permalink: true,
            permalinkSymbol: '#',
            permalinkBefore: true
        });
    }
})
interface Link {
    text: string,
    level: number
}

const route = useRoute()
const articleStroe = useArticleStore()
const store = useIndexStore()
const scrollElement = document.documentElement

// Propertys ...
let state = reactive<{
    id: number,
    editorId: string,
    previewTheme: 'default' | 'github' | 'vuepress'
}>({
    id: 0,
    editorId: 'my-mark',
    previewTheme: 'github'
})
let text = ref<string>('')

// Computeds ...
let summary = computed(() => articleStroe.article.summary)
let prevPage = computed(() => {
    let currentIndex = articleStroe.prevArtList.findIndex(i => i.id === state.id)
    return (currentIndex && currentIndex !== -1) ? articleStroe.prevArtList[currentIndex - 1] : undefined
})
let nextPage = computed(() => {
    let currentIndex = articleStroe.prevArtList.findIndex(i => i.id === state.id)
    return (currentIndex < articleStroe.prevArtList.length && currentIndex !== -1) ? articleStroe.prevArtList[currentIndex + 1] : undefined
})

let theme = computed(() => store.theme == 'auto' ? 'dark' : store.theme)

// Functions ....
const getArticleContentByArtId = async () => {
    const data = await API.getArticleDetailByArtId({ id: state.id })
    text.value = data.content_md || ''
}

const onGetCatalog = (list: Link[]) => {
    articleStroe.catalog = list
}

// 生命周期钩子 ...
onMounted(() => {
    state.id = Number(route.params.id)
    articleStroe.getArticle(state.id)
    getArticleContentByArtId()
})

</script>

<style>
.article-page-container {
    padding: 0;
}

.article {
    padding: 15px;
    display: -webkit-box;
    display: flex;
    font-size: 15px;
}

.md-editor-dark {
    --md-bk-color: var(--color-text-background) !important;
}

.md-editor-dark article [class*=-theme] {
    --md-theme-color: var(--color-text) !important;
    --md-theme-heading-color: var(--color-text) !important;
}

[class*=-theme] blockquote {
    background-color: var(--color-background-mute);
    border-left: 0.25rem solid var(--color-border-hover);
    display: block;
    line-height: 3;
    margin: 20px 0px;
    padding: 0px 1.2em;
}

[class*=-theme] table tr:nth-child(2n) {
    background: none;
}

[class*=-theme] a {
    color: var(--color-active) !important;
}

.article [class*=-theme] pre,
[class*=-theme] code {
    font-size: 13.6px;
    font-family: Source Code Pro, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
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
    /* box-shadow: var(--box-shadow); */
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

.prev-next {
    display: flex;
    margin-top: 20px;
}

.pager {
    width: 50%;
    cursor: pointer;
    padding: 10px 20px 20px 20px;
}

.pager-link {
    display: block;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid var(--color-border);
    transition: border .3s;
}

.pager-link .desc,
.title {
    display: block;
    width: 100%;
    line-height: 2;
}

.pager-link .title {
    color: var(--color-active);
}

.pager-link:hover {
    border: 1px solid var(--color-border-hover);
}

.next .desc,
.next .title {
    text-align: end;
}

@media screen and (max-width: 900px) {
    .article-right {
        display: none;
    }
}

@media screen and (max-width: 750px) {
    .article {
        padding: 0 0 15px 0;
    }

    .prev-next {
        flex-direction: column;
    }

    .pager {
        width: 100%;
    }
}
</style>