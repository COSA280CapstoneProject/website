import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeVue.vue';
import AllOpenings from '@/views/AllOpenings.vue';
import AdminLogin from '@/views/AdminVue.vue';
import RequestResource from '@/views/RequestResource.vue';



// Define your routes in an array
const routes = [
  {
    path: '/',
    name: 'HomeVue',
    component: Home
  },
  {
    path: '/all-openings',
    name: 'AllOpenings',
    component: AllOpenings
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { requiresGuest: true } // Only non-logged-in users should access the login page
  },
  {
    path: '/request-resource',
    name: 'RequestResource',
    component: RequestResource
  },

  // Define other routes as needed
];

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use history mode
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Here you check the login status
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'AdminLogin' });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'AdminDashboard' });
  } else {
    next();
  }
});

export default router;
