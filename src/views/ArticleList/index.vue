<template>
    <div class="article-list-page-container">
        <div class="center">
            <AllTags :total="state.arr.length" :list="state.arr" :type="type" :title="type == 'categoris' ? '分类' : '标签'"
                :activeId="Number(id)" />
            <div class="articl-list">
                <div class="article-item" v-for="item in articleData.list" @click="readMore(item)">
                    <div class="left">
                        <img v-lazy="item.cover" />
                    </div>
                    <div class="right">
                        <h3 class="title">{{ item.title }}</h3>
                        <div class="summary">{{ item.summary }}</div>
                        <div class="right-bottom">
                            <div class="tag-box">
                                <a v-for="i in item.tags"
                                    @click.stop="router.push({ name: 'ArticleList', params: { type: 'tags', id: i } })">
                                    <i class="tag-item"></i>
                                    {{ findTag(i) }}
                                </a>
                            </div>
                            <span>{{ format(item.pub_date || item.create_time, 'YYYY-MM-DD') }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination :current-page="articleData.offset + 1" :pager-count="pageCount" @next-click="handelPageChange"
                @prev-click="handelPageChange" @current-change="handelPageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, onMounted, computed } from 'vue'
import AllTags from '../../components/AllTags.vue'
import { useArticleStore } from '@/stores/article'
import Pagination from '@/components/Pagination.vue'
import API from '@/network/api/index'
import { format } from '@/hooks/dateFormat'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    type: 'tags' | 'categoris',
    id?: string,
    pageNum?: string
}>()

const articleStore = useArticleStore()
const state = reactive<{ arr: API.CateList | API.TagList, }>({ arr: [] })

const articleData = reactive<API.ArticleData>({
    list: [],
    offset: 0,
    pageSize: 12,
    total: 0
})

articleData.offset = props.pageNum ? Number(props.pageNum) - 1 : 0

let tags = computed(() => articleStore.tags)

console.log();


// 获取博客列表
const getArticleListByTypeId = async () => {
    const { list, offset, pageSize, total } = await API.getArticleListByTypeId({
        pageSize: articleData.pageSize,
        offset: articleData.offset,
        type: props.type == 'categoris' ? 'cate' : 'tag',
        id: props.id
    })
    articleData.list = list.map(item => {
        item.tags = item.tags.split(',').map((n: string) => Number(n))
        return item
    })
    articleData.offset = offset
    articleData.pageSize = pageSize
    articleData.total = total
}

// 计算当前总页码
let pageCount = computed(() => (articleData.total % articleData.pageSize == 0 ?
    articleData.total / articleData.pageSize :
    Math.floor(articleData.total / articleData.pageSize) + 1))

const findTag = (tagId: number) => tags.value.find(item => item.id == tagId)?.name

// 点击页码跳转
const handelPageChange = (num: number) => {
    router.push({
        name: num > 1 ? 'ArticleListPage' : 'ArticleList',
        params: num > 1 ? { type: props.type, id: props.id, pageNum: num } : { type: props.type, id: props.id }
    })
}

// 点击文章项跳转
const readMore = (item: API.Article) => {
    articleStore.setArticle(item)
    router.push({
        name: 'Article',
        params: { id: item.id }
    })
}

onMounted(() => {
    if (props.type == 'categoris') {
        articleStore.getCategoris()
        state.arr = articleStore.categoris
    } else {
        articleStore.getTags()
        state.arr = articleStore.tags
    }
    getArticleListByTypeId()
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
    overflow: hidden;
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