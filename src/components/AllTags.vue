<template>
    <Card>
        <template #title>共计 {{ total }}个{{ title }}</template>
        <template #content>
            <div class="tags-box">
                <router-link :to="`/${type}/${item.id}/`" class="tag-item" :class="activeId == item.id ? 'actived' : ''"
                    v-for="item in list">
                    {{ p }} {{ item.name }}
                </router-link>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Card from './Card.vue'
type Item = {
    name: string,
    [propName: string]: any
}
const props = withDefaults(defineProps<{
    type: 'categoris' | 'tags',
    list?: Item[],
    title?: string,
    total?: number,
    activeId?: number,
}>(), {
    list: () => [],
    title: '',
    total: 99,
    activeId: 0
})

let p = computed(() => props.type == 'tags' ? '#' : '')

</script>

<style scoped>
.card {
    box-shadow: 0 0 0;
}

.card .tags-box .actived {
    color: var(--color-avtive-text);
    background-color: var(--color-active);
}
</style>