<template>
  <Header />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="view-move" mode="out-in" appear>
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <GoTop />
  <Footer />
</template>

<script setup lang="ts">
import Header from '../layout/Header.vue'
import Footer from '../layout/Footer.vue'
import GoTop from '../components/GoTop.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style>
/* 页面跳转动画 */
.view-move-leave-active {
  animation: bounce-in .4s reverse;
}

.view-move-enter-active {
  animation: bounce-in .3s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>