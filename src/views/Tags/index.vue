<template>
    <div class="tags-page-container">
        <div class="center">
            <AllTags title="标签" :total="state.list.length" :list="state.list" link="/tags"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import AllTags from '../../components/AllTags.vue'
import { reactive, onMounted } from 'vue'
import API from '@/network/api/index'
const state = reactive<{ list: API.TagList}>({
    list: []
})

// 获取标签列表
const getTags = async () => {
    const data = await API.getTags()
    state.list = data
}

onMounted(()=> {
    getTags()
})

</script>