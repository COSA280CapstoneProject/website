<template>
  <div>
    <nav class="navbar">
      <!-- ... other navbar content ... -->
      <div class="user-info" v-if="isLoggedIn">
        {{ firstName }} {{ lastName }}
      </div>
      <div class="settings" ref="settings" @click="toggleSettings">
        <button :class="{ 'spin-animation': showSettings }">
          <i class="pi pi-cog"></i>
        </button>
        <transition name="fade-slide">
          <div v-show="showSettings" class="dropdown-menu" ref="dropdown">
            <div v-if="isLoggedIn" class="account-man" @click="openPopup">Account Management</div>
            <div v-if="isLoggedIn" class="logout" @click="handleLogout">Logout</div>
            <div v-else class="login" @click="promptForLogin">Login</div>
          </div>
        </transition>
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
            <div v-for="(admin, index) in admins" :key="index" class="admin-item" :class = "{ 'admin-selected': selectedAdmin === index}" @click="selectAdmin(index)">
              <p>{{ admin.name }} ({{ admin.email }})</p>
            </div>
            </div>
          </div>
            <button class="remove-admin" @click="removeAdmin" :disabled="selectedAdmin === null">Remove Admin</button>
          </div>
        </div>
      </div>
</template>




<script>
import 'primeicons/primeicons.css';

export default {
  data() {
    return {
      isLoggedIn: false,
      firstName: 'Carter',
      lastName: 'Gorski',
      showSettings: false,
      showPopup: false,
      admins: [
        { name: 'Rylan Copeland', email: 'admin1@example.com' },
        { name: 'Triston Lloyd', email: 'admin2@example.com' },
        { name: 'Javin', email: 'admin2@example.com' },
        { name: 'Arrsh', email: 'admin2@example.com' },
        { name: 'Admin Two', email: 'admin2@example.com' },
        // ... rest of the admins ...
      ],
      selectedAdmin: null
    };
  },

  mounted() {
    document.addEventListener('click', this.outsideClick);
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

    promptForLogin() {
      const code = prompt("Enter the 4 digit login code:");
      this.login(code);
    },

    handleLogout() {
      this.isLoggedIn = false;
      // Additional logout logic if needed
    },

    login(code) {
      if (code === '1234') {
        this.isLoggedIn = true;
        // You can add more login logic here
      } else {
        alert("Incorrect login code.");
      }
    },

    openPopup() {
      this.showSettings = false;
      this.showPopup = true;
    },

    closePopup() {
      this.showPopup = false;
    },

    outsideClick(event) {
      if (!this.showPopup && this.showSettings && this.$refs.dropdown && this.$refs.settings &&
          !this.$refs.dropdown.contains(event.target) &&
          !this.$refs.settings.contains(event.target)) {
        this.showSettings = false;
      }
      if (this.showPopup && this.$refs.popup && !this.$refs.popup.contains(event.target)) {
        this.closePopup();
      }
    },

    goToFormPage() {
      this.$router.push('/form');
    },

    addAdmin() {
      // Add admin logic
    },

    removeAdmin() {
      if (this.selectedAdmin !== null) {
        // Remove admin logic
        console.log("Removing admin:", this.admins[this.selectedAdmin]);
        // Reset selected admin
        this.selectedAdmin = null;

        // logout() {
        //   const tenantID = 'azure sucks ass'; // Replace with your Azure tenant ID
        //   const postLogoutRedirectUri = encodeURIComponent('http://localhost:8080/'); // Replace with the URL to redirect after logout

        //   const logoutUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/logout?post_logout_redirect_uri=${postLogoutRedirectUri}`;

        //   window.location.href = logoutUrl;
        // },
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