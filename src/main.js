<<<<<<< HEAD
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
=======
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import PrimeVue from 'primevue/config';
import HomePage from './views/HomePage.vue';
import ToastService from 'primevue/toastservice';
import Form from './views/Form.vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './assets/fonts.css';


// Define your routes
const routes = [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },

    { path: '/form',
      name: 'Form',
      component: Form
     },
  
  
    // Define other routes as needed
  ];
  
  // Create the router instance and pass the `routes` option
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL), // Use history mode
    routes,
  });

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router) // Use the router

app.mount('#app')
>>>>>>> main
