<template>
    <div class="card">
        <div class="card-title">
            <slot name="title">
                <h3>标题</h3>
            </slot>
        </div>
        <div class="card-content">
            <slot name="content">content...</slot>
        </div>
    </div>
</template>

<style>
.card {
    background-color: var(--color-text-background);
    padding: 15px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
}
.card-title {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 1.2rem;
}
</style>