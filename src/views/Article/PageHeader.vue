<template>
    <section>
        <div class="article-top center">
            <div class="article-att">
                <div class="categoris">
                    <router-link :to="{ name: 'ArticleList', params: { type: 'categoris', id: article.cate_id || 0 } }"
                        class="category-item">
                        {{ category?.name }}
                    </router-link>
                </div>
                <div class="tags">
                    <router-link :to="{ name: 'ArticleList', params: { type: 'tags', id: item } }" @click.stop=""
                        class="tag-item" v-for="item in tags">
                        {{ findTag(Number(item)) }}
                    </router-link>
                </div>
            </div>
            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-about">
                <div>
                    <i class="iconfont icon-date"></i>
                    <span class="text">{{ format(article.create_time, 'YYYY-MM-DD') }}</span>
                </div>
                <div>
                    <i class="iconfont icon-time"></i>
                    <span class="text">5分钟</span>
                </div>
                <div>
                    <i class="iconfont icon-read"></i>
                    <span class="text">{{ article.read_count || 199 }}</span>
                </div>
            </div>
        </div>
        <img :src="articleStore.article.cover" />
        <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762 52.917" :key="item" preserveAspectRatio="none"
            v-for="item in 4">
            <defs>
                <path id="wave"
                    d="M0 0c22.863 0 40.637 25.93 63.5 25.93S104.137 0 127 0s40.637 25.93 63.5 25.93S231.137 0 254 0s40.637 25.93 63.5 25.93S358.137 0 381 0s40.637 25.93 63.5 25.93S485.137 0 508 0s40.637 25.93 63.5 25.93S612.137 0 635 0s40.637 25.93 63.5 25.93S739.137 0 762 0v52.917H0z"
                    fill="purple"></path>
            </defs>
            <g>
                <use href="#wave"></use>
            </g>
            <g transform="translate(762 0)">
                <use href="#wave"></use>
            </g>
        </svg>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useArticleStore } from '@/stores/article'
import { format } from '@/hooks/dateFormat'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const articleStore = useArticleStore()
articleStore.getCategoris()
articleStore.getTags()
articleStore.getArticle(id.value)

let article = computed((): API.Article => articleStore.article)
let getRandomInt = (max: number) => Math.floor(Math.random() * max)
let theme = computed(() => `theme${(getRandomInt(4) + 1)}`)

let tags = computed(() => articleStore.article.tags)
const findTag = (tagId: number) => articleStore.tags.find((item: { id: number }) => item.id == tagId)?.name

let category = computed(() => articleStore.categoris.find(i => i.id == article.value.cate_id))
</script>

<style scoped>
/* 定义主题 --start */
.theme1 {
    background-color: var(--wave-1);
    --color-text-hover: var(--wave-1);
}

.theme2 {
    background-color: var(--wave-2);
    --color-text-hover: var(--wave-2);
}

.theme3 {
    background-color: var(--wave-3);
    --color-text-hover: var(--wave-3);
}

.theme4 {
    background-color: var(--wave-4);
    --color-text-hover: var(--wave-4);
}

.theme5 {
    background-color: var(--wave-5);
    --color-text-hover: var(--wave-5);
}

/* 定义主题 --start */

/* 定义动画 -- start */
@-webkit-keyframes wave {
    to {
        -webkit-transform: translate(-761px, 0);
        transform: translate(-761px, 0);
    }
}

@keyframes wave {
    to {
        -webkit-transform: translate(-761px, 0);
        transform: translate(-761px, 0);
    }
}

@-webkit-keyframes rise {
    50% {
        -webkit-transform: translate(0, calc(var(--rise) * -1%));
        transform: translate(0, calc(var(--rise) * -1%));
    }
}

@keyframes rise {
    50% {
        -webkit-transform: translate(0, calc(var(--rise) * -1%));
        transform: translate(0, calc(var(--rise) * -1%));
    }
}

/* 定义动画 -- end */

.article-top {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    backdrop-filter: blur(12px);
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
}

.article-att {
    display: flex;
    padding: 15px;
    line-height: 30px;
    font-size: 1rem;
}

.categoris {
    margin-right: 15px;
}

.category-item {
    color: var(--vt-c-white);
    padding: 8px 10px;
    border-radius: 8px;
    margin-right: 1rem;
    font-weight: 600;
    backdrop-filter: blur(--backdrop-filter);
    background-color: rgba(var(--white-rgb), var(--bg-opacity));
    transition: color 0.4s, backgorund-color 0.3s;
    /* box-shadow: var(--box-shadow); */
}

.category-item:hover {
    color: var(--color-active);
    background-color: var(--vt-c-white);
}

.tag-item {
    color: var(--vt-c-white-mute);
    margin-right: 2rem;
    position: relative;
    transition: all .3s;
}

.tag-item:hover {
    color: var(--vt-c-white);
}

.tag-item::before {
    position: absolute;
    top: 0.7rem;
    left: -1rem;
    transform: translateY(-50%);
    content: '#';
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--vt-c-text-dark-2);
    margin-right: 2px;
}

.article-title {
    font-size: 3rem;
    color: var(--vt-c-white);
    padding: 0 15px;
    /* line-height: 3.2rem; */
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

@media screen and (max-width: 750px) {
    .article-top {
        align-items: center;
    }

    .article-title {
        font-size: 1.8rem !important;
    }
}

.article-about {
    height: 60px;
    padding: 15px;
    color: var(--vt-c-white-mute);
    cursor: default;
}

.article-about .iconfont {
    margin-right: 4px;
}

.article-about .text {
    font-weight: 600;
}

.article-about>div {
    display: inline-block;
    margin-right: 12px;
}

/* 动画特效 */

section {
    position: relative;
    width: 100%;
    height: 30rem;
    overflow: hidden;
    display: block;
}

.wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    z-index: 2;
}

.wave {
    height: calc(var(--height, 0) * 1vh);
    width: calc(var(--width, 0) * 1vw);
}

.wave:nth-of-type(1) {
    --speed: 28;
    --opacity: 1;
    --height: 6;
    --width: 520;
    --lightness: 100;
    --rise: 2;
    --index: 1000;
    --delay: 0;
}

.wave:nth-of-type(2) {
    --speed: 30;
    --opacity: 0.6;
    --height: 6;
    --width: 520;
    --lightness: 95;
    --rise: 3;
    --index: 999;
    --delay: -1;
}

.wave:nth-of-type(3) {
    --speed: 34;
    --opacity: 0.6;
    --height: 8;
    --width: 500;
    --lightness: 90;
    --rise: 5;
    --index: 998;
    --delay: -2;
}

.wave:nth-of-type(4) {
    --speed: 38;
    --opacity: 0.6;
    --height: 10;
    --width: 500;
    --lightness: 85;
    --rise: 7;
    --index: 997;
    --delay: -3;
}

@media (max-width: 750px) {
    .wave {
        height: calc(var(--height, 0) * 0.75vh);
        width: calc(var(--width, 0) * 1.8vw);
    }
}

@media screen and (min-width: 751px) and (max-width: 1080px) {
    .wave {
        height: calc(var(--height, 0) * 0.8vh);
        width: calc(var(--width, 0) * 1.2vw);
    }
}

.wave path {
    opacity: var(--opacity) !important;
    fill: var(--color-background-main);
    -webkit-animation: wave calc(var(--speed, 0) * 1.2s) infinite linear;
    animation: wave calc(var(--speed, 0) * 1s) infinite linear;
    animation-delay: calc(var(--delay * 1s));
}
</style>