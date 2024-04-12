<template>
  <div>
    <!-- Navbar Container -->
    <nav class="navbar">

      <!-- Logo and Link to SaskPolytech -->
      <div class="logo-title">
        <a href="https://saskpolytech.ca/" target="_blank">
          <img src="@/assets/Saskatchewan_Polytechnic_logo.png" alt="Logo" class="logo">
        </a>
      </div>

      <!-- Display User Info if Logged In -->
      <div v-if="isLoggedIn" class="user-info">
        {{ firstName }} {{ lastName }}
      </div>

      <!-- Settings Button and Dropdown Menu for Logged In Users -->
      <div v-if="isLoggedIn" class="settings" ref="settings" @click="toggleSettings">
        <button :class="{ 'spin-animation': showSettings }">
          <i class="pi pi-cog"></i>
        </button>

        <!-- Dropdown Menu for Account Management and Logout -->
        <transition name="fade-slide">
          <div v-show="showSettings" class="dropdown-menu" ref="dropdown">
            <div class="account-man" @click="openPopup($event)">Account Management</div>
            <div class="logout" @click="Logout">Logout</div>
          </div>
        </transition>
      </div>
      
      <!-- Login Button for Users Not Logged In -->
      <div v-else class="login-button">
        <button @click="Login">Login</button>
      </div>

      <!-- Button to Navigate to the Form Page -->
      <div class="form-page">
        <button @click="goToFormPage">Form Page</button>
      </div>
    </nav>

    <!-- Popup for Admin Management -->
    <div v-show="showPopup" class="overlay">
      <div class="popup">
        <div class="popup-header">
          <span>Admin Management</span>

          <!-- Button to Close Popup -->
          <button class="close-button" @click="closePopup">X</button>
        </div>
        <div class="popup-content">

          <!-- Button to Add Admin -->
          <button class="add-admin" @click="addAdmin">Add Admin</button>
        </div>

        <!-- List of Admins with Remove Admin Functionality -->
        <div class="admin-list-container">
          <div class="admin-list">
            <div v-for="(admin, index) in admins" :key="admin.email" class="admin-item"
              :class="{ 'admin-selected': selectedAdmin === index}" @click="selectAdmin(index)">
              <p>{{ admin.name }} ({{ admin.email }})</p>
            </div>
          </div>
          <div class="removal-error" v-if="removalError">{{ removalError }}</div>
          <button class="remove-admin" @click="removeAdminButton" :disabled="selectedAdmin === null">Remove Admin</button>
        </div>
      </div>
    </div>
        <!-- New Popup for Adding an Admin -->
        <div v-show="showAddAdminPopup" class="overlay">
      <div class="popup add-admin-popup">
        <div class="popup-header">
          <span>Add Admin</span>
          <button class="close-button" @click="closeAddAdminPopup">X</button>
        </div>
        <div class="popup-content">
          <input type="text" id="adminName" v-model="newAdminName" placeholder="Enter Full Name">
          <input type="email" id="adminEmail" v-model="newAdminEmail" placeholder="Enter admin email">
          <p v-if="emailValidationError" class="add-admin-error">{{ emailValidationError }}</p>
          <p v-if="formError" class="add-admin-error">{{ formError }}</p>
          <button class="submit-admin"
                  :class="{ 'submit-admin-disabled': !newAdminName.trim().length || !newAdminEmail.trim().length }"
                  @click="submitAdminButton"
                  :disabled="!newAdminName.trim().length || !newAdminEmail.trim().length">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  data() {
    return {
      // User authentication status
      isLoggedIn: false,
      firstName: null,
      lastName: null,
      msalInstance: false,
      showSettings: false,
      showPopup: false,
      showAdminView: false,
      admins: [],
      selectedAdmin: null,
      newAdminEmail: '',
      newAdminName: '',
      emailValidationError: '',
      showAddAdminPopup: false,
      removalError: '',
      formError: '',
    };
  },

  // Lifecycle hook that is called after the component is mounted
  async mounted() {
    // Add global click listener for detecting clicks outside certain UI elements
    document.addEventListener('click', this.outsideClick);

    // Initialize MSAL and check for authentication response
    await this.$msal.handleRedirectPromise();
    this.msalInstance = true;
    
    // Fetch the first account from MSAL instance
    this.account = await this.$msal.getAllAccounts()[0];

    // Check if an account exists and set user information
    if (this.account) {
      this.isLoggedIn = true;
      this.firstName = this.account.idTokenClaims.name;

      // Fetch administrators from the backend
      const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabaseAdministrators');
      const administrators = await response.json();
      // Check if the logged-in user is an admin
      const isAdmin = administrators.some(admin => admin.Email === this.account.idTokenClaims.email);

      // Map and push administrator information to component state
      const adjustedAdmins = administrators.map(admin => ({
        email: admin.Email,
        name: admin.Name,
        adminID: admin.AdminID
      }));
      this.admins.push(...adjustedAdmins, { email: this.account.idTokenClaims.email, name: this.account.idTokenClaims.name });
      
      // Show admin view if user is an admin
      if (isAdmin) {
        this.showAdminView = true;
      }
    }
  },

  // Lifecycle hook for cleanup before the component is destroyed
  beforeUnmount() {
    // Remove the global click listener
    document.removeEventListener('click', this.outsideClick);
  },

  // Watcher for the showPopup data property
  watch: {
    showPopup(value) {
      // Prevent scrolling on the body when popup is visible
      document.body.style.overflow = value ? 'hidden' : '';
    },
  },

  // Component methods
  methods: {
    // Toggle the settings visibility
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },

    // Detect clicks outside of settings dropdown and popup to close them
    outsideClick(event) {
      if (!this.showPopup && this.showSettings && this.$refs.dropdown && this.$refs.settings &&
          !this.$refs.dropdown.contains(event.target) &&
          !this.$refs.settings.contains(event.target)) {
        this.showSettings = false;
      }
    },

    // Navigate to the form page
    goToFormPage() {
      this.$router.push('/form');
    },

    // Handle user login
    async Login() {
      await this.$msal.loginRedirect({
        scopes: ["user.read", "email", "profile"],
      });

      const account = await this.$msal.getAllAccounts()[0];
      // Set user information upon successful login
      this.account = {
        username: account.username,
        name: account.name,
        email: account.idTokenClaims.email,
      };

      // Update login status
      if (this.account) {
        this.isLoggedIn = true;
      }
    },

    // Handle user logout
    async Logout() {
      await this.$msal.logoutRedirect();
      this.isLoggedIn = false;
    },

    // Open the admin management popup
    openPopup() {
      this.showPopup = true;
      this.showSettings = false;
      event.stopPropagation();
    },

    // Close the admin management popup
    closePopup() {
      this.showPopup = false;
    },

    
    async fetchAdmins() {
      try {
        const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabaseAdministrators');
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        const administrators = await response.json();
        this.admins = administrators.map(admin => ({
          email: admin.Email,
          name: admin.Name,
          adminID: admin.AdminID
        }));
      } catch (error) {
        console.error("Error fetching admins:", error);
        // Handle errors (e.g., show an error message)
      }
    },

    addAdmin() {
      this.openAddAdminPopup();
    },

    openAddAdminPopup() {
      this.showAddAdminPopup = true;
      this.showPopup = false;
    },

    closeAddAdminPopup() {
      this.showAddAdminPopup = false;
      this.newAdminEmail = '';
      this.emailValidationError = '';
      this.showPopup = true;
    },

    async submitAdmin() {
    if (!this.newAdminEmail) {
      this.emailValidationError = "Email is required";
      return;
    }

    const adminID = Math.floor(1000 + Math.random() * 9000); // generate a four digit random adminID

    const adminData = {
      email: this.newAdminEmail,
      name: this.newAdminName,
      adminID: adminID, // use the generated adminID
      partnerID: adminID // use the same adminID as the partnerID to keep track in the database
    };

    try {
      const response = await fetch('https://ictdatabasefileupload.azurewebsites.net/api/addICTSQLDatabaseAdministrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error('Failed to add admin');
      }
        this.closeAddAdminPopup();
        this.showPopup = true;
        await this.fetchAdmins();
    
      } catch (error) {
        console.error("Error adding admin:", error);
        this.formError = 'Failed to add admin, please try again later';
      }
    },

    submitAdminButton() {
      // Validate the email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.newAdminEmail)) {
        this.emailValidationError = 'Please enter a valid email address';
        return;
      }
      this.submitAdmin();
      this.closeAddAdminPopup();
      this.showPopup = true;
    },

    // Select an admin from the list
    selectAdmin(index) {
      this.selectedAdmin = index;
    },

    // Remove an admin from the list
    async removeAdmin() {
    if (this.selectedAdmin === null) {
      console.error("No admin selected");
      return;
    }

    const adminToRemove = this.admins[this.selectedAdmin];
    const adminData = {
      adminID: adminToRemove.adminID,
    };

    try {
      const response = await fetch('https://ictdatabasefileupload.azurewebsites.net/api/deleteICTSQLDatabaseAdministrator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error('Failed to remove admin');
      }
      console.log("Admin removed successfully");

      this.admins.splice(this.selectedAdmin, 1);
      this.selectedAdmin = null;
    } catch (error) {
      console.error("Error removing admin:", error);
      this.removalError = 'Failed to remove admin, please try again later';
      setTimeout(() => {
        this.removalError = '';
      }, 15000);
    }
  },

    // Remove admin button functionality
    removeAdminButton() {
      if (this.selectedAdmin === null) {
        console.error("No admin selected");
        return;
      }
      this.removeAdmin();
  },

  clearRemovalError() {
    this.removalError = '';
  },
},
};
</script>




<style scoped>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Styles for the <html> and <body> to ensure they take up the full viewport height */
html, body {
  width: 100%;
  height: 100%;
}

/* Flexbox container for logo and title ensuring space between elements and alignment */
.logo-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: auto;
}

/* Styles for the logo, making it clickable */
.logo {
  width: 85px;
  margin-right: auto;
  cursor: pointer;
  padding-top: 2px;
}

/* Form page button styles */
.form-page button {
  background-color: #c56eff;
  border: none;
  border-radius: 5px;
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
  margin: auto;
}

/* Hover and active states for form page button */
.form-page button:hover {
  background-color: #a51eff;
}

.form-page button:active {
  transform: scale(0.98);
  box-shadow: inset 0 0 2px #000000;
}

/* Navbar container styles */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #753C97;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
  z-index: 1000;
}

/* Margin for direct child divs of navbar for spacing */
.navbar > div {
  margin-left: 15px;
}

/* Login button styles */
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

/* Hover and active states for login button */
.login-button button:hover {
  background-color: #a51eff;
}

.login-button button:active {
  transform: scale(0.98);
  box-shadow: inset 0 0 2px #000000;
}

/* Settings dropdown container */
.settings {
  position: relative;
}

/* Settings button styles */
.settings button {
  background: none;
  color: white;
  border: none;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
}

/* Icon within settings button */
.settings button i {
  font-size: 28px;
}

/* Spin animation for settings icon */
.spin-animation {
  transform: rotate(180deg);
}

/* Transition effects for dropdown menu */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s ease-in-out;
}

/* Initial and final states for dropdown animation */
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0);
}

.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* User info styles */
.user-info {
  color: white;
  font-size: 18px;
}

/* Dropdown menu styles */
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

/* Styles for account management and logout options */
.account-man, .logout, .login {
  color: black;
  padding: 10px;
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  text-decoration: none;
  display: block;
  transition: box-shadow 0.1s ease-in-out;
}

/* Hover styles for menu options */
.account-man:hover, .logout:hover {
  background-color: #f1f1f1;
}

/* Active styles for menu options */
.account-man:active, .logout:active {
  box-shadow: inset 0 0 1px #000000;
}

/* Overlay styles for modals and popups */
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

/* Prevents scrolling on the body when modal is open */
body.no-scroll {
  overflow: hidden;
}

/* Popup/modal styles */
.popup {
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 40%;
  min-width: 300px;
  max-width: 500px;
  position: relative;
}

/* Popup header styles */
.popup-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
}

/* Popup title styles */
.popup-header span {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* Close button styles */
.popup-header {
  border: none;
  background: none;
  font-size: 20px;
  cursor: default;
  transition: color 0.3s ease;
}

/* Hover effect for close button */
.popup-header {
  color: #888;
}

/* Content area of the popup */
.popup-content {
  margin-bottom: 20px;
}

/* Styles for the list of administrators */
.admin-list {
  overflow-y: auto;
  height: 250px;
  border: 1px solid #eaeaea;
  padding: 10px;
  margin-bottom: 10px;
  font-size: calc(8px + 0.5vmin);
}

/* Container for admin list and actions */
.admin-list-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* Individual admin item styles */
.admin-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Styles for the selected admin item */
.admin-selected {
  background-color: #e1acff;
}

/* Hover styles for admin items */
.admin-item:not(.admin-selected):hover {
  background-color: #dbdbdb;
}

/* Add and remove admin button styles */
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

/* Smaller size and auto margin for remove admin button */
.remove-admin {
  width: 30%;
  font-size: small;
  margin: auto;
}

.removal-error {
  padding: 10px;
  bottom: 0;
  color: red;
  font-size: 0.6em;
}


/* Hover styles for add and remove buttons */
.popup .add-admin:hover, .popup .remove-admin:hover{
  background-color: #723281;
}

/* Disabled state for remove admin button */
.remove-admin:disabled{
  background-color: #f7d1ff;
  cursor: not-allowed;
}

/* Styles for the close button within popups */
.close-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 24px;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Hover effect for close button */
.close-button:hover {
  color: white;
  background-color: red;
  padding-left: 5px;
  padding-right: 5px;
}

/* Styles for the admin email and text input fields */
input[type="email"], input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px; /* This creates space between the input fields */
  border: 1px solid #ccc;
  border-radius: 5px;
}


/* Styles for the submit button inside the popup */
.submit-admin {
  background-color: #ab4ec0;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 10px auto;
  text-align: center;
}

/* Hover effect for the submit button */
.submit-admin:hover {
  background-color: #723281;
}

/* Disabled state for the submit button */
.submit-admin-disabled {
  background-color: #f7d1ff;
  cursor: not-allowed;
}

/* Styles for the add admin error message */
.add-admin-error {
  color: #f44336;
  margin-top: 10px;
  font-size: 0.9em;
  text-align: center;
}


/* Media query for responsive adjustments */
@media screen and (max-width: 950px) {
  /* Adjustments for logo size in smaller screens */
  .logo {
    width: 70px;
  }

  /* Adjustments for user info font size in smaller screens */
  .user-info {
    font-size: 14px;
  }

  /* Adjustments for settings button icon size in smaller screens */
  .form-page button {
    font-size: 1px;
  }

  /* Adjustments for remove admin button and close button in smaller screens */
  .remove-admin, .close-button {
    width: 50%;
  }

  /* Adjust position and size of close button for small screens */
  .close-button {
    top: -20px;
    right: -23px;
    font-size: 16px;
    padding: 5px;
    width: 30px;
    height: 30px;
}

    .close-button:hover {
    color: white;
    background-color: red;
  }

  /* Adjust font size and width of form page button for small screens */
  .form-page button {
    font-size: 12px;
    width: 50px;
  }
}
</style>
