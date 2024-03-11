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

// MSAL imports
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig'; // Ensure this path is correct

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Handle the redirect promise only once when the application loads
msalInstance.handleRedirectPromise().then((response) => {
  // Here you can handle the authentication response.
  // For example, you could store the user's information in the application's state.
  console.log('Authentication response:', response);
}).catch((error) => {
  console.error('Failed to handle redirect:', error);
});

// Define your routes
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/form',
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

const app = createApp(App);

// Make MSAL instance available to all components
app.config.globalProperties.$msal = msalInstance;

app.use(PrimeVue);
app.use(ToastService);
app.use(router); // Use the router

app.mount('#app');