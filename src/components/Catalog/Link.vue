<template>
    <div class="catalog-link">
        <span class="catalog-link-item" :class="currentLink == link.text ? 'active' : ''" @click.self="clickLink(link)">{{
            link.text }}</span>
    </div>
</template>

<script setup lang="ts">
import type { Link } from './type'
defineProps<{
    link: Link,
    clickLink: Function,
    currentLink: string
}>()
</script>

<style>
.catalog-link {
    cursor: pointer;
}

.catalog-link-item {
    display: inline-block;
    width: 100%;
    line-height: 2em;
    margin: 4px 0;
    padding: 4px 10px;
    border-radius: 8px;
}

.catalog-link-item:hover,
.catalog-link .active {
    color: var(--vt-c-white);
    background-color: var(--color-active);
}
</style>