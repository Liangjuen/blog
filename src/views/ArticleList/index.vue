<template>
    <div class="article-list-page-container">
        <div class="center">
            <AllTags :total="state.list.length" :list="state.list" :type="type" :title="type == 'categoris' ? '分类' : '标签'"
                :activeId="Number(id)" />
            <div class="articl-list">
                <div class="article-item" v-for="item in 10">
                    <div class="left"></div>
                    <div class="right">
                        <h3 class="title">如何让博客支持AI摘要，使用TianliGPT自动生成文章的AI摘要</h3>
                        <div class="summary">环境发生的环境</div>
                        <div class="right-bottom">
                            <div class="tag-box">
                                <router-link v-for="item in 3" to="/tags"><i class="tag-item"></i>前端</router-link>
                            </div>
                            <span>2023-4-16</span>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :current-page="1" :pager-count="24" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, onMounted } from 'vue'
import AllTags from '../../components/AllTags.vue'
import { useArticleStore } from '@/stores/article'
import Pagination from '@/components/Pagination.vue'
const props = defineProps<{
    type: 'tags' | 'categoris',
    id?: string
}>()

const articleStore = useArticleStore()
const state = reactive<{ list: API.CateList | API.TagList }>({
    list: []
})

onMounted(() => {
    if (props.type == 'categoris') {
        articleStore.getCategoris()
        state.list = articleStore.categoris
    } else {
        articleStore.getTags()
        state.list = articleStore.tags
    }
})
</script>

<style scoped>
.articl-list {
    padding: 15px;
}

.article-item {
    display: flex;
    margin-top: 1.5rem;
    cursor: pointer;
    background-color: var(--color-text-background);
    transition: box-shadow .4s, transform .2s ease-in;
    border-radius: 8px;
}

.article-item:hover {
    box-shadow: var(--box-shadow);
    transform: translateY(-5px);
}

.tag-item {
    margin-right: 8px;
    position: relative;
    transition: all .3s;
}

.tag-item::before {
    position: absolute;
    top: 8px;
    transform: translateY(-50%);
    content: '#';
    font-weight: 600;
    font-size: 12px;
}

.tag-box>a {
    margin-right: 1rem;
}

.tag-box>a:hover {
    color: var(--color-border-hover);
}

.article-item .left {
    height: 108px;
    background-color: #ff9700;
    border-radius: 8px;
    overflow: hidden;
}

.article-item .right {
    flex: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.article-item .right .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.article-item .right .summary {
    color: var(--color-text-2);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 12px;
}

.right-bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 12px;
}

@media screen and (max-width: 1080px) {
    .article-item .left {
        width: 108px;
    }
}

@media screen and (min-width: 1080px) {
    .article-item .left {
        width: 192px;
    }
}
</style>