<template>
  <div>
    <nav class="navbar">
      <div class="user-info">
        <span>{{ firstName }} {{ lastName }}</span>
      </div>
      <div class="settings" ref="settings" @click="toggleSettings">
        <button :class="{ 'spin-animation': showSettings }">
          <i class="pi pi-cog"></i>
        </button>
        <transition name="fade-slide">
          <div v-show="showSettings" class="dropdown-menu" ref="dropdown">
            <div class="dropdown-option">Account Management</div>
            <div class="dropdown-option">Logout</div>
          </div>
        </transition>
      </div>
      <div class="form-page">
        <button>Form Page</button>
      </div>
    </nav>
  </div>
</template>



<script>
import 'primeicons/primeicons.css';

export default {
  data() {
    return {
      showSettings: false
    }
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
    },
    outsideClick(event) {
      if (this.showSettings && (!this.$refs.dropdown.contains(event.target) &&
        !this.$refs.settings.contains(event.target))) {
        this.showSettings = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.outsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.outsideClick);
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
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.form-page button:hover {
  background-color: #45a049; /* Darker green */
  color: white;
}

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: purple;
  color: white;
  display: flex;
  justify-content: flex-end;
  padding: 15px;
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
  transform: translateY(-100);
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
  width: auto;
  max-height: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.dropdown-option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
</style>