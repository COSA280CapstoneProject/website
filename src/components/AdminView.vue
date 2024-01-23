<template>
    <div class="admin-login">
      <h1>Admin Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username">
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        // Here you can implement your login logic
        console.log(`Admin is trying to login with username: ${this.username} and password: ${this.password}`);
      }
    }
  }
  </script>
  
  <style scoped>
  </style>