<template>
    <section :class="theme">
        <div class="article-top center">
            <div class="article-att">
                <div class="categoris">
                    <router-link to="/" class="category-item">原创</router-link>

                </div>
                <div class="tags">
                    <router-link to="/" class="tag-item">科技</router-link>
                </div>
            </div>
            <div class="article-title">使用竹白作为你的博客更新邮件订阅服务提供商，如何让博客支持邮件订阅。</div>
            <div class="article-about">
                <div>
                    <i class="iconfont icon-date"></i>
                    <span class="text">2023-3-21</span>
                </div>
                <div>
                    <i class="iconfont icon-time"></i>
                    <span class="text">1分钟</span>
                </div>
                <div>
                    <i class="iconfont icon-comment"></i>
                    <span class="text">19</span>
                </div>
            </div>
        </div>
        <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 762 52.917" :key="item" preserveAspectRatio="none" v-for="item in 4">
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
    import { computed } from 'vue';
    let getRandomInt = (max:number) => {
            return Math.floor(Math.random() * max)
        }

    let theme = computed(()=> `theme${(getRandomInt(4) + 1)}`)
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
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 60%;
    width: 100%;
    box-sizing: border-box;
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
    display: inline-block;
    color: var(--vt-c-white);
    padding: 2px 8px;
    border-radius: 8px;
    margin-right: 1rem;
    font-weight: 600;
    transition: all 0.3s;
    backdrop-filter: blur(20px);
    letter-spacing: 0.5rem;
    box-shadow: 0 0 30px 10px rgba(0,0,0,0.1);

}
.category-item:hover {
    color: var(--color-text-hover);
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
    left: -50%;
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
}

.wave {
    height: calc(var(--height, 0) * 1vh);
    width: calc(var(--width, 0) * 1vw);
    -webkit-animation: rise calc(var(--speed, 0) * 1.5s) infinite linear;
    animation: rise calc(var(--speed, 0) * 1.5s) infinite linear;
}

.wave:nth-of-type(1) {
    --speed: 38;
    --opacity: 1;
    --height: 6;
    --width: 380;
    --lightness: 100;
    --rise: 2;
    --index: 1000;
    --delay: 0;
}

.wave:nth-of-type(2) {
    --speed: 32;
    --opacity: 0.6;
    --height: 6;
    --width: 380;
    --lightness: 95;
    --rise: 3;
    --index: 999;
    --delay: -1;
}

.wave:nth-of-type(3) {
    --speed: 34;
    --opacity: 0.6;
    --height: 8;
    --width: 380;
    --lightness: 90;
    --rise: 5;
    --index: 998;
    --delay: -2;
}

.wave:nth-of-type(4) {
    --speed: 36;
    --opacity: 0.6;
    --height: 10;
    --width: 380;
    --lightness: 85;
    --rise: 7;
    --index: 997;
    --delay: -3;
}

@media (max-width: 480px) {
    .wave {
        height: calc(var(--height, 0) * 0.75vh);
    }
}

.wave path {
    opacity: var(--opacity) !important;
    fill: var(--color-background-main);
    -webkit-animation: wave calc(var(--speed, 0) * 1s) infinite linear;
    animation: wave calc(var(--speed, 0) * 1s) infinite linear;
    animation-delay: calc(var(--delay * 1s));
}

</style>