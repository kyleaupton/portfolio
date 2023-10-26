import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FloatingVue from 'floating-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import 'floating-vue/dist/style.css';
import './fontawesome';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(FloatingVue)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
