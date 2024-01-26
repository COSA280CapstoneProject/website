<template>
  <div>
    <nav class="navbar">
      <div class="user-info">
        <span>{{ firstName }} {{ lastName }}</span>
      </div>
      <div class="settings" ref="settings" @click="toggleSettings">
        <button>
          <i class="pi pi-cog"></i>
        </button>
        <div v-show="showSettings" class="dropdown-menu">
          <div class="dropdown-option">Account Management</div>
          <div class="dropdown-option">Logout</div>
        </div>
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
  mounted() {
    document.addEventListener('click', this.documentClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.documentClick);
  },
  methods: {
    toggleSettings(event) {
      event.stopPropagation();
      this.showSettings = !this.showSettings;
    },
    documentClick(event) {
      if (this.$refs.settings && !this.$refs.settings.contains(event.target)) {
        this.showSettings = false;
      }
    }
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

.dropdown-menu {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  display: none;
}

.settings button {
  background: none;
  border: none;
}

.settings button i {
  font-size: 28px;
}

.settings:hover .dropdown-menu {
  display: block;
}
.dropdown-option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
</style>