import { computed } from 'vue';
<template>
    <div class="gotop-box">
        <transition name="move" mode="out-in" appear>
            <i v-show="show" class="iconfont icon-rocket" @click="comeBack"></i>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import { watch, ref, onMounted, onUnmounted } from 'vue' 
    let scrollTop =  ref<number>()
    let show = ref<boolean>(false)
    const obj = document.querySelector('html')
    const handleScroll = () => {
        scrollTop.value = obj?.scrollTop
    }

    const comeBack = () => {
        obj?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    watch(()=> scrollTop.value, (val)=> {
        show.value = val? (val > 200? true : false ): false
    }, {
        immediate: true
    })

    onMounted(() => {
        document.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
        document.removeEventListener('scroll', handleScroll)
    })
</script>

<style scoped>
.gotop-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
}
.icon-rocket {
    position: fixed;
    bottom: 60px;
    right: 15px;
    font-size: 2rem;
    cursor: pointer;
    color: var(--color-text);
    z-index: 99;
}
/* 动画 */
.move-enter-active,
.move-leave-active {
  transition: all 0.5s ease-in-out;
}

.move-enter-to,
.move-leave-from {
    opacity: 1;
}
.move-enter-from,
.move-leave-to {
  opacity: 0;
  transform: translateY(70px);
}
</style>