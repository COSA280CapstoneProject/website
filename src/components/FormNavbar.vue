<template>
    <div class="Navbar" style="z-index: 10;">
        <div class="Navbar-container">
          <div class="logo-container">
        <a href="https://saskpolytech.ca/" target="_blank">
          <img src="@/assets/Saskatchewan_Polytechnic_logo.png" alt="Introduction Image" class="logo" />
        </a>
        </div>
        <button class="hamburger" @click="Statspopup">
      <i class="fas fa-bars"></i>
    </button>
    <button class="sorting" @click="showSorting = !showSorting">
        Sorting &#9660; <!-- This is a Unicode character for a down arrow -->
      </button>
      
    <div class="search-bar">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="Search..." />
    </div>
    <button class="four-square">
      <i class="fa-solid fa-table-cells-large"></i>
    </button>
    <button class="more-options" @click="showDropdown = !showDropdown">
      <i class="fas fa-ellipsis-v"></i>
    </button>
    <ExportDropdown :show="showDropdown" />
    <SortingMenu v-if="showSorting" />
    </div>
    </div>
    
  </template>
  
  <script>
  import ExportDropdown from '@/components/ExportDropdown.vue'
  import SortingMenu from '@/components/SortingDropdown.vue'

  export default {
    name: 'SearchAndSort',
    components: {
      ExportDropdown,
      SortingMenu,
    },
    data() {
      return {
      showDropdown: false,
      showSorting: false
    }
    },
    methods: {
    toggleMenu() {
      console.log('toggleMenu');
    }
    // ...existing methods...
  }
    // You can add methods to handle search and sorting here
  };
  </script>
  
  <style>
.Navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the container */
  height: 60px;
  z-index: 1000;
  background-image: url("@/assets/header.jpg");
}

.Navbar-container {
  width: calc(100% - 10mm); /* Reduce the width to create space on the sides */
  display: flex;
  align-items: center; 
  justify-content:space-between; /* Distribute the items equally */
}

.logo-container {
  width: 50px; /* Set the width of the logo container */
}

.logo {
  width: 100%; /* Ensure the logo fits the container */
}

.hamburger {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
  border: none;
  background-color: transparent;
  margin-left: 0px; /* Adjust margin to move the hamburger closer to the logo */
}

.hamburger i {
  font-size: 35px;
}
.sorting {
  margin-left: 5mm;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 20px; /* Increase the font size of the sorting icon */

}
.search-bar {
  position: relative;
  margin-left: 5mm;

}

.search-bar i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search-bar input {
  padding-left: 30px;
  width: 300px; /* Increase the width of the search bar */
  height: 40px; /* Increase the height of the search bar */

}
.four-square {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
    border: none;
    background-color: transparent;
}

.four-square i {
  font-size: 35px;
}
  

  .more-options {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
  border: none;
    background-color: transparent;
}

.more-options i {
  font-size: 35px;
}
  </style>
  