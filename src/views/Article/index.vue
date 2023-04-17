<template>
    <div class="article-page-container">
        <PageHeader />
        <section class="articl center" id="more">
            <div class="article-main">
                <p class="summary">{{ summary }}</p>
                <article v-html="html" :class="`markdown-body ${'hljs-atom-one-light'}`"></article>
            </div>
            <aside class="article-right">
                <Card v-if="state.docs.length">
                    <template #title>
                        <i class="iconfont icon-dir_outline"></i>
                        <span>目录</span>
                    </template>
                    <template #content>
                        <ul class="direc-item">
                            <li @click.prevent="handleNavClick(item.slug)" v-for="item in state.docs" class="link"
                                :href="'#' + item.slug">
                                {{ item.title }}
                            </li>
                        </ul>
                    </template>
                </Card>
            </aside>
        </section>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue'
import Card from '../../components/Card.vue'
import { useArticleStore } from '@/stores/article'
import { useRoute } from 'vue-router'
import { onMounted, ref, computed, reactive, toRefs } from 'vue'
import useMarkdownIt from '@/hooks/markdownIt'
import API from '@/network/api/index'

const route = useRoute()
const articleStroe = useArticleStore()
let state = reactive<{
    docs: { title: string, slug: string }[]
}>({
    docs: []
})
let html = ref<string>('')

const getArticleContentByArtId = async () => {
    const data = await API.getArticleDetailByArtId({ id: Number(route.params.id) })
    const { htmlStr, docs } = useMarkdownIt(data.content_md)
    html.value = htmlStr
    state.docs = docs
}
let summary = computed(() => articleStroe.article.summary)
const handleNavClick = (idName: string) => {
    let h = document.getElementById(idName)
    h?.scrollIntoView({ behavior: 'smooth' })
}
onMounted(() => {
    getArticleContentByArtId()
})

</script>

<style>
.article-main ul li,
ol li {
    transform: translateX(1rem);
}

.article-main ul li::marker,
ol li::marker {
    color: var(--color-active);
}

.article-main ul li {
    list-style-type: decimal;
}

.article-main ol li {
    list-style-type: square;
}

.articl {
    padding: 15px;
    display: -webkit-box;
    display: flex;
}

.article-main {
    flex: 1;
    background-color: var(--color-text-background);
    border-radius: 10px;
    flex-direction: column;
    min-width: 0;
    box-shadow: var(--box-shadow);
}

.article-main .summary {
    text-indent: 2rem;
    padding: 15px;
    border-bottom: 2px dashed var(--color-border);
}

article {
    padding: 15px;
}

.markdown-body pre.hljs {
    position: relative;
    margin: 1rem 0 !important;
    z-index: 1;
    border-radius: 8px;
    overflow-x: auto !important;
    padding: 1.2rem;
}

article p code {
    background-color: var(--color-background-mute);
    padding: 0.15em 0.5em;
    border-radius: 4px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    white-space: nowrap;
}

article pre code {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    line-height: 1.4;
}

article h2,
article h3 {
    margin: 2rem 0 6px 0;
}

article a {
    transition: color 0.4s, text-decoration 0.3s;
    color: var(--color-active);
}

article a:hover {
    text-decoration: underline;
}

article pre .lang {
    line-height: 1rem;
    position: absolute;
    top: 4px;
    right: 8px;
    color: var(--vt-c-text-dark-2);
    z-index: 3;
    cursor: default;
    opacity: 0.6;
    font-weight: 500;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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
</style>