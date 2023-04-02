<template>
    <div class="page-container">
        <span class="num">404</span>
        <router-link class="link" to="/">返回首页</router-link>
    </div>
</template>

<style scoped>
.page-container {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.num {
    font-size: 5rem;
    display: inline-block;
    font-weight: bold;
}
.link {
    padding: 4px 1rem;
    border-radius: 12px;
    color: var(--color-text);
    border: 2px solid var(--color-text);
    transition: all 0.3s;
}
.link:hover {
    background-color: var(--color-text);
    color: var(--color-background-main);
}
</style>