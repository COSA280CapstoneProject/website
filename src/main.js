import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css' // Add this line
import 'primevue/resources/primevue.min.css' // Add this line
import 'primeicons/primeicons.css' // Add this line

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')