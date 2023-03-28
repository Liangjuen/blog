<template>
    <Header/>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="view-move" mode="out-in" appear>
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
    <GoTop/>
    <Footer/>
</template>

<script setup lang="ts">
import Header from '../layout/Header.vue'
import Footer from '../layout/Footer.vue'
import GoTop from '../components/GoTop.vue'
</script>

<style>

/* 页面跳转动画 */
.view-move-leave-active {
    animation: bounce-in .4s reverse;
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .view-move-enter-active {
    animation: bounce-in .3s;
    transition: all .4s ease;
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