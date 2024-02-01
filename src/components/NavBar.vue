<template>
  <nav class="navbar">
    <!-- Logo or Brand Name -->
    <router-link to="/" class="navbar-brand">ICT Agency</router-link>

    <!-- Navigation Links -->
    <div class="navbar-menu">
      <router-link to="/all-openings">All Openings</router-link>
      <router-link to="/request-resource">Request a Resource</router-link>

      <!-- Dynamic Links Based on Authentication Status -->
      <template v-if="isAdminLoggedIn">
        <span class="navbar-text">
          {{ adminInfo.firstName }} {{ adminInfo.lastName }}
        </span>
        <router-link to="/admin/dashboard">Account Management</router-link>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/admin/login">Admin</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAdminLoggedIn', 'adminInfo']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
}

.navbar-brand {
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-menu a {
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;
}

.navbar-menu a:hover {
  text-decoration: underline;
}

.navbar-text {
  color: #fff;
  margin-right: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f00;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #c00;
}
</style>
