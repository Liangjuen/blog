<template>
    <div class="article-page-container">
        <PageHeader/>
        <section class="articl center" id="more">
            <div class="article-main">
                <p class="summary"></p>
                <article v-html="str" v-highLight></article>
            </div>
            <aside class="article-right">
                <Card>
                    <template #title>
                        <i class="iconfont icon-dir_outline"></i>
                        <span>目录</span>
                    </template>
                    <template #content>
                        <div class="direc-item">
                            <h3 class="title">基础</h3>
                            <a class="link active" href="#深入响应式">深入响应式</a>
                        </div>
                    </template>
                </Card>
            </aside>
        </section>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue'
import Card from '../../components/Card.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import API from '@/network/api/index'
const route = useRoute()

let str = ref<string>('')

const getArticleContentByArtId = async () => {
    const data = await API.getArticleDetailByArtId({ id: Number(route.params.id) })
    str.value = data.content_md
}
onMounted(()=> {
    getArticleContentByArtId()
})

</script>

<style>
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
}
.summary {
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
article pre code {
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}

article a {
    transition: all 0.3s;
    color: var(--color-active);
}
article a:hover {
    text-decoration: underline;
}

article pre .lang {
    line-height: 1rem;
    position: absolute;
    top: 8px;
    right: 8px;
    color: var(--vt-c-text-dark-2);
    z-index: 3;
    cursor: default;
    opacity: 0.6;
}

.article-right {
    width: 15rem;
    margin-left: 15px;
    min-width: 200px;
}
.article-right .card {
    position: sticky;
    top: 75px;
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
}
.direc-item .link:hover, .direc-item .active {
    color: var(--color-active);
}
@media screen and (max-width: 900px) {
    .article-right  {
        display: none;
    }
}
</style>