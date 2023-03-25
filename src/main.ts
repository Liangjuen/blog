import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPlugin from './plugins/piniaPlugin'
import App from './App.vue'
import router from './router'
import mountDirective from './directive/index'

import './assets/css/main.css'

const store = createPinia()

const app = createApp(App)

// 使用状态持久化插件
store.use(piniaPlugin())
// 挂载全局自定义指令
mountDirective(app)

app.use(store)

app.use(router)

app.mount('#app')
