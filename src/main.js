// import './assets/main.css' // 原有的删。因为有导入
import './assets/css/reset.css' // 这个重置样式自己找下
// 如果有共用的加  common.css

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
