<template>
  <nav class="navbar">
    <div class="navbar-brand">Saskatchewan Polytechnic</div>
    <div class="navbar-menu">
      <button v-if="account" @click="signOut">Sign Out</button>
      <button v-else @click="signIn">Sign In</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavbar',
  data() {
    return {
      account: null, // Add this to track authentication status
      msalInitialized: false, // Track MSAL initialization status
    };
  },
  async mounted() {
    // Wait for MSAL instance to be initialized
    await this.$msal.handleRedirectPromise();

    // Set msalInitialized flag to true
    this.msalInitialized = true;

    // Check if the user is already signed in
    this.account = await this.$msal.getAllAccounts()[0];
  },
  methods: {
    async signIn() {
      // Access the global MSAL instance and initiate the sign-in process
      await this.$msal.loginRedirect({
        scopes: ["User.Read"] // Specify the scopes your application requires
      });

      // Retrieve the account details after sign-in
      this.account = await this.$msal.getAllAccounts()[0];
    },
    async signOut() {
      // Access the global MSAL instance and initiate the sign-out process
      await this.$msal.logoutRedirect();

      // Reset the account information
      this.account = null;
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