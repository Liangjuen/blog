<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script setup lang="ts">
import useTheme from './hooks/theme'
useTheme()
</script>
