<template>
    <div class="home-page-container home">
        <Hero />
        <div id="article"></div>
        <div class="main-content center">
            <div v-rollIn class="content-item" v-for="item in state.list" :key="item.id" @click="readMore(item)">
                <div class="cover-box"><img v-lazy="item.cover" /></div>
                <div class="title">
                    <span class="link">{{ item.title }}</span>
                    <div class="Abstract">{{ item.summary }}</div>
                    <div class="bottom-box">
                        <div class="tag-box">
                            <a v-for="tagId in item.tags"
                                @click.stop="router.push({ name: 'ArticleList', params: { type: 'tags', id: tagId } })">
                                <i class="tag-item"></i>
                                {{ findTag(tagId) }}
                            </a>
                        </div>
                        <span>{{ format(item.create_time, 'YYYY-MM-DD') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :pagerCount="pageCount" v-model:current-page="currentPage" @next-click="handelPageChange"
            @prev-click="handelPageChange" @current-change="handelPageChange" />
    </div>
</template>

<script setup lang="ts">
import Hero from './Hero.vue'
import { onMounted, reactive, computed, defineProps } from 'vue'
import Pagination from '../../components/Pagination.vue'
import { useArticleStore } from '@/stores/article'
import API from '@/network/api/index'
import { format } from '@/hooks/dateFormat'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
    pageNum?: string
}>()
const articleStore = useArticleStore()
let currentPage = computed({
    get() {
        return state.offset + 1
    },
    set(val: number) {
        state.offset = val - 1
    }
})
interface State extends API.ArticleData {
    tags: API.TagList
}

let state = reactive<State>({
    list: [],
    pageSize: 10,
    offset: 0,
    total: 0,
    tags: []
})

state.offset = props.pageNum ? Number(props.pageNum) - 1 : 0

let pageCount = computed(() => state.total % state.pageSize == 0 ? state.total / state.pageSize : Math.floor(state.total / state.pageSize) + 1)

// 获取文章列表
const getArtList = async () => {
    const { list, offset, total } = await API.getArticleTopList({ pageSize: state.pageSize, offset: state.offset })
    state.list = list.map(i => {
        i.tags = i.tags.split(',').map((n: string) => Number(n))
        return i
    })
    articleStore.setPrevArtList(list)
    state.offset = offset
    state.total = total
}

// 获取标签列表
const getTags = () => {
    articleStore.getTags()
    state.tags = articleStore.tags
}

const findTag = (tagId: number) => state.tags.find(item => item.id == tagId)?.name

const readMore = (item: API.Article) => {
    articleStore.setArticle(item)
    router.push({
        name: 'Article',
        params: { id: item.id }
    })
}

// 点击页码跳转
const handelPageChange = (num: number) => {
    router.push({
        name: num > 1 ? 'HomePage' : 'Home',
        params: num > 1 ? { pageNum: num } : {}
    })
}

onMounted(() => {
    getTags()
    getArtList()
})
</script>

<style scoped>
main .home {
    padding: 0;
}

.main-content {
    margin-top: 74px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.content-item {
    position: relative;
    border-radius: 20px;
    background-color: var(--color-text-background);
    margin: 20px 15px 0 15px;
    transition: box-shadow .4s, transform .2s ease-in;
    display: flex;
    overflow: hidden;
    cursor: pointer;
}

.content-item:hover {
    box-shadow: var(--box-shadow);
    transform: translateY(-5px);
}

.content-item .tag-box a:hover {
    color: var(--color-border-hover);
}

.title {
    flex: 1 0 200px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 1rem;
    box-sizing: border-box;
    overflow: hidden;
}

.title .link {
    font-size: 1.2rem;
    font-weight: bold;
}

.title .link,
.Abstract {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.Abstract {
    font-size: 1rem;
    color: var(--color-text-2);
    line-height: 1.2rem;
}

.cover-box {
    min-width: 200px;
    height: 12rem;
}

.bottom-box {
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.tag-box>a {
    margin-right: 1rem;
}

.tag-item {
    margin-right: 1rem;
    position: relative;
    transition: all .3s;
}

.tag-item::before {
    position: absolute;
    top: 0.7rem;
    left: -50%;
    transform: translateY(-50%);
    content: '#';
    font-weight: 600;
    font-size: 1rem;
    margin-right: 2px;
}

@media screen and (max-width: 700px) {
    .main-content {
        flex-direction: column;
    }

    .content-item {
        height: 22rem;
        flex-flow: row wrap;
    }

    .cover-box {
        width: 100%;
    }
}

@media screen and (min-width: 700px) and (max-width: 1080px) {
    .main-content {
        flex-direction: column;
    }

    .content-item {
        flex: 1;
        height: 25rem;
    }

    .cover-box {
        width: 45%;
    }
}

@media screen and (min-width: 1080px) {
    .main-content {
        justify-content: center;
    }

    .content-item {
        width: 500px;
        max-width: 560px;
        height: 22rem;
        flex-flow: row wrap;
    }

    .cover-box {
        width: 100%;
    }

    .content-item:nth-child(2n +1) {
        margin-right: 0;
    }

    .main-content::after {
        height: 0;
        content: '';
        width: 500px;
        max-width: 560px;
        margin: 20px 15px 0 15px;
    }
}
</style>