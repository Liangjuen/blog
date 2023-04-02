<template>
    <div class="categoris-page-container">
        <div class="center">
            <AllTags :total="state.list.length" :list="state.list" title="分类" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AllTags from '../../components/AllTags.vue'
import API from '@/network/api/index'
import { reactive, onMounted } from 'vue'

const state = reactive<{ list: API.CateList, [propName:string]:any }>({
    list: []
})

const getAllCategoris = async () => {
    const data = await API.getAllCategoris()
    state.list = data
}

onMounted(() => {
    getAllCategoris()
})
</script>