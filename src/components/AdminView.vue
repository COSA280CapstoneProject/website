<template>
  <div>
    <nav class="navbar">
      <div class="user-info">
        <span>{{ firstName }} {{ lastName }}</span>
      </div>
      <div class="settings">
        <button @click="showSettings = !showSettings">
          <i class="pi pi-cog"></i>
        </button>
        <div v-if="showSettings" class="dropdown-menu">
          <!-- Settings options go here -->
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
      firstName: 'First Name',
      lastName: 'Last Name',
      showSettings: false,
    };
  },
};
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
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
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
</style>