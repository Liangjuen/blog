<template>
    <div class="pagination-container">
        <i class="btn iconfont icon-left" v-show="currentPage > 1" @click="checkLast"></i>
        <div class="pagination-center">
            <span class="page-size" v-show="currentPage > 1" @click="changePage(1)">1</span>
            <span class="iconfont icon-more-outline" v-show="currentPage > 4"></span>
            <span class="page-size last" @click="changePage(currentPage - 2)" v-show="currentPage > 3">{{ currentPage - 2 }}</span>
            <span class="page-size" @click="changePage(currentPage - 1)" v-show="currentPage > 2">{{ currentPage - 1 }}</span>
            <span class="page-size current">{{ currentPage }}</span>
            <span class="page-size" @click="changePage(currentPage + 1)" v-show="currentPage < total - 1">{{ currentPage + 1 }}</span>
            <span class="page-size next" @click="changePage(currentPage + 2)" v-show="currentPage < total - 2">{{ currentPage + 2 }}</span>
            <span class="iconfont icon-more-outline" v-show="total - currentPage > 3" ></span>
            <span class="page-size" @click="changePage(total)" v-show="currentPage < total">{{ total }}</span>
        </div>
        <i class="btn iconfont icon-right" @click="checkNext" v-show="currentPage < total"></i>
        <div class="goto-box">
            <span>Go To</span>
            <input class="goto" v-model.number="inputNum" @keyup.enter="onInputEnter"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
const props = defineProps<{
    total: number,
    currentPage: number
}>()

// 自定义事件
const emit = defineEmits<{
  (e: 'prev-click', value: number): void
  (e: 'next-click', value: number): void
  (e: 'current-change', value: number) : void
}>()

// 步长
let step = ref<number>(1)
let inputNum = ref<number>(0)

watch(()=> props.currentPage,(val:number)=> {
    inputNum.value = val
},{ immediate:true })

const onInputEnter = () => {
    let n:number = inputNum.value > props.currentPage? props.total : inputNum.value
    changePage(n)
}

const changePage = (num:number) => {
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
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pagination-center {
        width: 32rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn {
        border: none;
        cursor: pointer;
    }
    .btn, .page-size  {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        background-color: var(--color-text-background);
        line-height: 3rem;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--box-shadow);
        transition: all 0.3s;
        margin: 0 0.5rem;
    }
    .btn:hover, .page-size:hover {
        color: var(--color-avtive-text);
        background-color: var(--color-active);
    }
    .iconfont {
        margin: 0 5px;
    }
    .current {
        color: var(--color-avtive-text);
        background-color: var(--color-active);
    }
    .goto-box {
        margin-left: 10px;
    }
    .goto {
        border: 1px solid var(--color-border);
        width: 5rem;
        height: 2.5rem;
        border-radius: 4px;
        outline: none;
        transition: all 0.3s;
        background-color: var(--color-text-background);
        margin-left: 5px;
        color: var(--color-active);
    }
    .goto:hover {
        border: 1px solid var(--color-active);
    }
    .goto:focus {
        border: 1px solid var(--color-active);
    }
    @media screen and (max-width: 700px) {
        .pagination-center {
            width: 20rem;
        }
        .last, .next, .pagination-center .iconfont {
            display: none;
        }
        .goto-box {
            display: none;
        }
    }
</style>