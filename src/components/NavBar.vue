<template>
  <div>
    <nav class="navbar">
      <div class="title">Welcome to ICT for Saskatchewan Polytechnic!</div>
      <!-- Conditional Rendering Based on Logged In Status -->
      <div v-if="isLoggedIn" class="user-info">
        {{ firstName }} {{ lastName }}
      </div>
      <div v-if="isLoggedIn" class="settings" ref="settings" @click="toggleSettings">
        <button :class="{ 'spin-animation': showSettings }">
          <i class="pi pi-cog"></i>
        </button>
        <transition name="fade-slide">
          <div v-show="showSettings" class="dropdown-menu" ref="dropdown">
            <div class="account-man" @click="openPopup($event)">Account Management</div>
            <div class="logout" @click="Logout">Logout</div>
          </div>
        </transition>
      </div>
      <!-- Simple Login Button for Logged Out Users -->
      <div v-else class="login-button">
        <button @click="Login">Login</button>
      </div>
      <div class="form-page">
        <!-- Form Page button -->
        <button @click="goToFormPage">Form Page</button>
      </div>
    </nav>
    <!-- Popup Overlay and Content -->
    <div v-show="showPopup" class="overlay">
      <div class="popup">
        <div class="popup-header">
          <span>Admin Management</span>
          <!-- Close Button -->
          <button class="close-button" @click="closePopup">X</button>
        </div>
        <div class="popup-content">
          <!-- Popup Form -->
          <button class="add-admin" @click="addAdmin">Add Admin</button>
        </div>
        <!-- Admin List -->
        <div class ="admin-list-container">
          <div class="admin-list">
            <div v-for="(admin, index) in admins" :key="admin.email" class="admin-item" :class="{ 'admin-selected': selectedAdmin === index}" @click="selectAdmin(index)">
              <p>{{ admin.name }} ({{ admin.email }})</p>
            </div>
          </div>
          <button class="remove-admin" @click="removeAdmin" :disabled="selectedAdmin === null">Remove Admin</button>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      firstName: null,
      lastName: null,
      msalInstance: false,
      showSettings: false,
      showPopup: false,
      showAdminView: false,
      admins: [],
      selectedAdmin: null,
    };
  },

  async mounted() {
    document.addEventListener('click', this.outsideClick);

    await this.$msal.handleRedirectPromise();
    this.msalInstance = true;
    
    this.account = await this.$msal.getAllAccounts()[0];

      if (this.account) {
        this.isLoggedIn = true;
        this.firstName = this.account.idTokenClaims.name;
        this.lastName = "(" + this.account.idTokenClaims.email + ")";
        //this.firstName = this.account.idTokenClaims.given_name;
        //this.lastName = this.account.idTokenClaims.family_name;

        const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabaseAdministrators');
        const administrators = await response.json();
        const isAdmin = administrators.some(admin => admin.Email === this.account.idTokenClaims.email);

        const adjustedAdmins = administrators.map(admin => ({
        email: admin.Email,
        name: admin.Name
        }));
        this.admins.push(...adjustedAdmins, { email: this.account.idTokenClaims.email, name: this.account.idTokenClaims.name });
        
      if (isAdmin) {
        this.showAdminView = true;
      }
    }
  },

  beforeUnmount() {
    document.removeEventListener('click', this.outsideClick);
  },

  watch: {
    showPopup(value) {
      document.body.style.overflow = value ? 'hidden' : '';
    },
  },

  methods: {

  toggleSettings() {
      this.showSettings = !this.showSettings;
    },

    outsideClick(event) {
      if (!this.showPopup && this.showSettings && this.$refs.dropdown && this.$refs.settings &&
          !this.$refs.dropdown.contains(event.target) &&
          !this.$refs.settings.contains(event.target)) {
        this.showSettings = false;
      }
    },

    goToFormPage() {
      this.$router.push('/form');
    },

    async Login() {
      await this.$msal.loginRedirect({
        scopes: ["user.read", "email", "profile"],
      });

      const account = await this.$msal.getAllAccounts()[0];

      this.account = {
        username: account.username,
        name: account.name,
        email: account.idTokenClaims.email,
        firstName: account.idTokenClaims.given_name,
        lastName: account.idTokenClaims.family_name
      };

      if (this.account) {
        this.isLoggedIn = true;
      }
    },

    async Logout() {
      await this.$msal.logoutRedirect();
      this.isLoggedIn = false;
    },

    openPopup() {
        this.showPopup = true;
        this.showSettings = false;
        event.stopPropagation();
    },

    closePopup() {
      this.showPopup = false;
    },

    addAdmin() {
      // Add admin logic
    },

    selectAdmin(index) {
      this.selectedAdmin = index;
    },

    removeAdmin() {
      if (this.selectedAdmin !== null) {
        // Remove admin logic
        this.selectedAdmin = null;
      }
    },
  }
}
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 24px;
  margin-right: auto;
}

.form-page button {
  background-color: #c56eff;
  border: none;
  color: rgb(255, 255, 255);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;
  border-radius: 5px;
  margin: auto;
}

.form-page button:hover {
  background-color: #a51eff;
  color: rgb(255, 255, 255);
}

.form-page button:active {
  transform: scale(0.98);
  box-shadow: inset 0 0 2px #000000;
}

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-image: url(~@/assets/header.jpg);
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
  padding-top: 5px;
}

.navbar > div {
  margin-left: 15px;
}

.login-button button {
  background-color: #c56eff;
  border: none;
  color: rgb(255, 255, 255);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;
  border-radius: 5px;
}

.login-button button:hover {
  background-color: #a51eff;
  color: rgb(255, 255, 255);
}

.login-button button:active {
  transform: scale(0.98);
  box-shadow: inset 0 0 2px #000000;
}

.settings {
  position: relative;
}

.settings button {
  background: none;
  border: none;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
}

.settings button i {
  font-size: 28px;
}

.spin-animation {
  transform: rotate(180deg);
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s ease-in-out;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0);
}

.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 5px);
  background-color: #f9f9f9;
  width: 200px;
  max-height: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border: 1px solid #000000;
  z-index: 10000000;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.account-man, .logout, .login {
  color: black;
  padding: 10px;
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  text-decoration: none;
  display: block;
  transition: box-shadow 0.1s ease-in-out;
}

.account-man:hover, .logout:hover {
  background-color: #f1f1f1;
}

.account-man:active, .logout:active {
  box-shadow: inset 0 0 1px #000000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

body.no-scroll {
  overflow: hidden;
}

.popup {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 40%;
  min-width: 300px;
  max-width: 500px;
  position: relative;
}

.popup-header {
  display: flex;
  justify-content:center;
  margin-bottom: 20px;
  position: relative;
}

.popup-header span {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.popup-header button {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.popup-header button:hover {
  color: #888;
}

.popup-content {
  margin-bottom: 20px;
}

.admin-list {
  overflow-y: auto;
  height: 250px;
  border: 1px solid #eaeaea;
  padding: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
}

.admin-list-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.admin-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.admin-selected {
  background-color: #e1acff;
}

.admin-item:not(.admin-selected):hover {
  background-color: #dbdbdb;
}

.add-admin, .remove-admin{
  background-color: #ab4ec0;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 50%;
  font-size: 16px;
}

.remove-admin {
  width: 30%;
  font-size: small;
  margin: auto;
}

.popup .add-admin:hover, .popup .remove-admin:hover{
  background-color: #723281;
}

.remove-admin:disabled{
  background-color: #f7d1ff;
  cursor: not-allowed;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
}

@media screen and (max-width: 950px) {
  .remove-admin {
    width: 50%;
  }

  .close-button {
    top: -20px;
    right: -23px;
    font-size: 20px;
  }

  .form-page button {
    font-size: 12px;
    width: 50px;
  }
}

</style>