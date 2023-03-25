<template>
    <div class="home-page-container">
        <!-- <Hero/> -->
        <div class="main-content center">
            <div class="main-content-item" v-for="item in 4">
                <image class="cover" src=""></image>
                <div class="title">Edge浏览器已经开始下载了，但是浏览器内没有提示解决方法，解决下载提示显示延迟问题</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Content from '../../layout/Content.vue'
import Hero from './Hero.vue'
</script>

<style scoped>
.main-content {
    display: flex;
    flex-flow: row wrap;
    margin: 30px auto;
}
.main-content-item {
    border-radius: 8px;
    background-color: var(--color-text-background);
    min-height: 15rem;
    margin-bottom: 15px;
    transition: all .4s;
    font-size: 1rem;
    display: flex;
    flex-flow: row wrap;
    border: 1px solid var(--color-background-mute);
    margin: 15px 15px 0 15px;
    overflow: hidden;
}

/* .cover {
    background-color: #eee;
} */
.main-content-item:hover {
    border: 1px solid var(--color-border-hover);
}
</style>