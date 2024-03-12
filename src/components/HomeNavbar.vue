<template>
  <nav class="navbar">
    <div class="navbar-brand">Saskatchewan Polytechnic</div>
    <div class="navbar-menu">
      <button @click="signIn">Sign In</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavbar',
  methods: {
    signIn() {
      // Access the global MSAL instance and initiate the sign-in process
      this.$msal.loginRedirect({
        scopes: ["User.Read"] // Specify the scopes your application requires
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>

<style>
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-image: url(@/assets/img.png);
  color: #fff;
  z-index: 1;
}
.navbar-brand {
  font-size: 1.5rem;
}
.navbar-menu button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>