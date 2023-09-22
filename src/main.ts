import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import 'floating-vue/dist/style.css'

const pinia = createPinia()

createApp(App).use(pinia).use(FloatingVue).mount('#app')
