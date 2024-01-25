import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')