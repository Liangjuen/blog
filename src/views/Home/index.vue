<template>
    <div class="home-page-container">
        <Hero/>
        <div class="main-content center">
            <div class="content-item">
                <div class="cover-box"><img  src="../../assets/image/p.jpg" /></div>
                <div class="title">
                    <router-link to="/article" class="link">Edge浏览器已经开始下载，浏览卡萨丁金阿奎浏览历史打开的，大手大脚</router-link>
                    <div class="Abstract">关电视就的撒肯德基加快速度洒咖啡，大手大脚，大健康大量较大时刻的接口深刻的拉升看到啦</div>
                    <div class="bottom-box">
                        <div class="tag-box">
                            <router-link to="/tags"><i class="tag-item"></i>技巧</router-link>
                        </div>
                        <span>2023-3-24</span>
                    </div>
                </div>
            </div>
        </div>
        <Pagination 
            :total="21" 
            v-model:current-page="currentPage" 
            @next-click="handelNextClcik" 
            @prev-click="handelPrevClick" 
            @current-change="handelCurrentPageChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hero from './Hero.vue'
import Pagination from '../../components/Pagination.vue'
let currentPage = ref<number>(1)
let handelPrevClick = (num:number) => {
    // ...
    currentPage.value  = num
}
const handelNextClcik = (num:number) => {
    // ...
    currentPage.value  = num
}
const handelCurrentPageChange = (num:number) => {
    // ...
    currentPage.value  = num
}
</script>

<style scoped>
.main-content {
    display: flex;
    flex-flow: row wrap;
    /* padding: 15px; */
    justify-content: space-between;
}

.content-item {
    position: relative;
    border-radius: 8px;
    background-color: var(--color-text-background);
    margin: 15px 15px 0 15px;
    transition: all .4s;
    display: flex;
    border: 1px solid var(--color-background-mute);
    overflow: hidden;
    flex-flow: row wrap;
}

.content-item:hover {
    box-shadow: var(--box-shadow);
    transform: scale(1.01)
}
.content-item .title .link:hover  {
    color: var(--color-border-hover);
}
.title {
    flex: 1 0 200px;
    padding: 15px;
    transition: color 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:flex-start;
    font-size: 1rem;
    box-sizing: border-box;
    overflow: hidden;
}
.title .link {
    font-size: 1.2rem;
    font-weight: bold;
}
.title .link, .Abstract {
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 2; 
}
.Abstract {
    font-size: 1rem;
    color: var(--color-text-2);
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

.tag-box > a {
    margin-right: 1rem;
}
.tag-box > a:hover {
    color: var(--color-border-hover);
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
@media screen and (max-width: 750px) {
    .main-content {
        flex-direction: column;
    }
    .content-item  {
        height: 25rem;
    }
    .cover-box {
        width: 100%;
    }
}

@media screen and (min-width: 751px) and (max-width: 1080px) {
    .main-content {
        flex-direction: column;
    }
    .content-item  {
        flex: 1;
        height: 25rem;
    }
    .cover-box {
        width: 45%;
    }
}

@media screen and (min-width: 1081px) {
    .main-content {
        justify-content: center;
    }
    .content-item  {
        flex: 1 0 420px;
        height: 25rem;
    }
    .cover-box {
        width: 100%;
    }
    .content-item:last-child {
        max-width: calc(50% - 15px);
    }
    .content-item:nth-child(2n +1) {
        margin-right: 0;
    }
}


</style>