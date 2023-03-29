<template>
    <div class="home-page-container">
        <!-- <Hero/> -->
        <div class="main-content center">
            <div class="content-item" v-for="item in 7">
                <img class="cover-box" src="../../assets/image/p.jpg" />
                <div class="title">
                    <h3>Edge浏览器已经开始下载，浏览卡萨丁金阿奎浏览历史打开的，大手大脚</h3>
                    <div class="Abstract">关电视就的撒肯德基加快速度洒咖啡，大手大脚，大健康大量较大时刻的接口深刻的拉升看到啦</div>
                    <div class="bottom-box">
                        <div class="tag-box">
                            <span><i class="tag-item"></i>技巧</span>
                            <span><i class="tag-item"></i>技巧</span>
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
    padding: 15px;
}

.content-item {
    border-radius: 8px;
    background-color: var(--color-text-background);
    margin-bottom: 15px;
    transition: all .4s;
    display: flex;
    border: 1px solid var(--color-background-mute);
    overflow: hidden;
    flex-flow: row wrap;
    cursor: pointer;
    overflow: hidden;
}


.content-item:hover {
    box-shadow: var(--box-shadow);
    transform: scale(1.01)
}
.content-item:hover .title h3 {
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
.title h3 {
    font-size: 1.2rem;
    font-weight: bold;
}
.title h3, .Abstract {
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

.tag-box > span {
    margin-right: 1rem;
}
.tag-box > span:hover {
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
    .content-item:nth-child(2n +1) {
        margin-right: 0;
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
    .content-item:nth-child(2n +1) {
        margin-right: 0;
    }
}

@media screen and (min-width: 1081px) {
    .content-item  {
        flex: 1 0 30rem;
        height: 25rem;
        max-width: 48%;
    }
    .cover-box {
        width: 100%;
    }
    .content-item:nth-child(2n +1) {
        margin-right: 15px;
    }
}


</style>