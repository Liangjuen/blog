<template>
    <div class="pagination-container">
        <div class="turn-page-box"><i class="iconfont icon-left" v-show="currentPage > 1" @click="checkLast"></i></div>
        <div class="pagination-center">
            <span class="page-size" v-show="currentPage > 1" @click="changePage(1)">1</span>
            <span class="iconfont icon-more-outline" v-show="currentPage > 4"></span>
            <span class="page-size last" @click="changePage(currentPage - 2)" v-show="currentPage > 3">{{ currentPage - 2
            }}</span>
            <span class="page-size last" @click="changePage(currentPage - 1)" v-show="currentPage > 2">{{ currentPage - 1
            }}</span>
            <span class="page-size current" v-if="pagerCount">{{ currentPage }}</span>
            <span class="page-size next" @click="changePage(currentPage + 1)" v-show="currentPage < pagerCount - 1">{{
                currentPage + 1 }}</span>
            <span class="page-size next" @click="changePage(currentPage + 2)" v-show="currentPage < pagerCount - 2">{{
                currentPage + 2 }}</span>
            <span class="iconfont icon-more-outline" v-show="pagerCount - currentPage > 3"></span>
            <span class="page-size" @click="changePage(pagerCount)" v-show="currentPage < pagerCount">{{ pagerCount
            }}</span>
        </div>
        <div class="turn-page-box"><i class="iconfont icon-right" @click="checkNext" v-show="currentPage < pagerCount"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
const props = defineProps<{
    pagerCount: number,
    currentPage: number
}>()

// 自定义事件
const emit = defineEmits<{
    (e: 'prev-click', value: number): void
    (e: 'next-click', value: number): void
    (e: 'current-change', value: number): void
}>()

// 步长
let step = ref<number>(1)
let inputNum = ref<number>(0)

watch(() => props.currentPage, (val: number) => {
    inputNum.value = val
}, { immediate: true })

const changePage = (num: number) => {
    emit('current-change', num)
}

const checkNext = () => {
    emit('next-click', props.currentPage + step.value)

}

const checkLast = () => {
    emit('prev-click', props.currentPage - step.value)
}
</script>

<style scoped>
.pagination-container {
    margin: 45px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
}

.pagination-center {
    width: 32rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.turn-page-box {
    width: 3rem;
    height: 3rem;
}

.turn-page-box>.iconfont,
.page-size {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    background-color: var(--color-text-background);
    line-height: 3rem;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    transition: color .3s, backgorund-color .3s, box-shadow .2s, transform .3s;
}

.page-size {
    margin: 0 0.5rem;
}

.btn:hover,
.page-size:hover,
.turn-page-box>.iconfont:hover {
    color: var(--color-avtive-text);
    background-color: var(--color-active);
    transform: scale(1.1);
    box-shadow: var(--box-shadow);
}

.current {
    color: var(--color-avtive-text);
    background-color: var(--color-active);
}

@media screen and (max-width: 700px) {
    .pagination-center {
        width: 13rem;
    }

    .last,
    .next,
    .pagination-center .iconfont {
        display: none;
    }
}
</style>