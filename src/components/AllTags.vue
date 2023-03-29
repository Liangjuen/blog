<template>
    <Card>
        <template #title>标签 256</template>
        <template #content>
            <div class="tags-box">
                <router-link to="/" class="tag-item"># 技术</router-link>
            </div>
        </template>
    </Card>
</template>
<script setup lang="ts">
import Card from './Card.vue'
</script>