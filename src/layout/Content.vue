<template>
    <div class="main-container">
        <slot name="view"> default content... </slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .main-container {
        margin-top: 60px;
        background-color: var(--color-background-main);
    }
</style>