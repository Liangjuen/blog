<template>
    <div class="article-page-container">
        <PageHeader/>
        <section class="articl center">
            <div class="article-content">
                <div id="深入响应式">深入响应式</div>
                <div id="计算属性">计算属性</div>
                <div id="监听属性">监听属性</div>
            </div>
            <div class="article-right">
                <Card>
                    <template #title>
                        <i class="iconfont icon-dir_outline"></i>
                        <span>目录</span>
                    </template>
                    <template #content>
                        <div class="direc-item">
                            <h3 class="title">基础</h3>
                            <a class="link active" href="#深入响应式">深入响应式</a>
                            <a class="link" href="#计算属性">计算属性</a>
                            <a class="link" href="#监听属性">监听属性</a>
                        </div>
                    </template>
                </Card>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue'
import Card from '../../components/Card.vue'
</script>

<style scoped>
.articl {
    padding: 15px;
    display: flex;
}
.article-content {
    flex: 1;
    height: 800px;
    background-color: var(--color-text-background);
    border-radius: 10px;    
    padding: 15px;
}
.article-right {
    width: 15rem;
    margin-left: 15px;
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