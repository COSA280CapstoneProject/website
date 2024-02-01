import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store/index.js'; // Import your Vuex store

createApp(App).use(router).use(store).mount('#app');