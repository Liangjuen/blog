<template>
    <Card>
        <template #title>{{ title }}共计 {{ total }}个</template>
        <template #content>
            <div class="tags-box">
                <router-link :to="link" class="tag-item" v-for="item in list">
                    <span v-show="true">#</span> 
                    {{ item.name }}
                </router-link>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import Card from './Card.vue'
type Item = {
    name: string,
    [propName:string]: any
}
withDefaults(defineProps<{
    list?: Item[],
    title?: string,
    total?: number,
    link?: string
}>(), {
    list:() => [],
    title: '标题',
    total: 99,
    link: '/'
})

</script>