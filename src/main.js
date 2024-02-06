import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AdminView from './components/AdminView.vue' // Import your component
import '@fortawesome/fontawesome-free/css/all.css'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Form from './views/Form.vue'

// Define your routes
const routes = [
  { path: '/form', component: Form },
  { path: '/admin', component: AdminView },
  // other routes...
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router) // Use the router

app.mount('#app')