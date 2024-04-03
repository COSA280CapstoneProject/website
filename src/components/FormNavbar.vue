<template>
    <div class="Navbar">
        <div class="Navbar-container">
        <button class="hamburger" @click="Statspopup">
      <i class="fas fa-bars"></i>
    </button>
    <button class="sorting" @click="showSorting = !showSorting">
        Sorting &#9660; <!-- This is a Unicode character for a down arrow -->
      </button>
      
    <div class="search-bar">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="Search..." v-model="searchQuery" />
    </div>
    <button class="four-square">
      <i class="fa-solid fa-table-cells-large"></i>
    </button>
    <button class="more-options" @click="showDropdown = !showDropdown">
      <i class="fas fa-ellipsis-v"></i>
    </button>
    <ExportDropdown :show="showDropdown" @close-export="closeExportDropdown"/>
    <SortingMenu v-if="showSorting" @sort-key-changed="updateSortKeys" @close-Sort="closeSortingMenu"   />
    <StatsDropdown v-if="showStatsDropdown" />
    </div>
    </div>
    
  </template>
  
  <script>
  import ExportDropdown from '@/components/ExportDropdown.vue'
  import SortingMenu from '@/components/SortingDropdown.vue'
  import StatsDropdown from '@/components/StatsDropdown.vue'

  export default {
    name: 'SearchAndSort',
    components: {
      ExportDropdown,
      SortingMenu,
      StatsDropdown
    },
    data() {
      return {
      showDropdown: false,
      showStatsDropdown: false,
      showSorting: false,
      searchQuery: '',
    }
    },
    methods: {
    toggleMenu() {
      console.log('toggleMenu');
    },
    Statspopup() {
      this.showStatsDropdown = !this.showStatsDropdown;
    },
    updateSortKeys(newSortKeys) {
      this.sortKey = newSortKeys; // Update sortKey when it changes
      this.$emit('navbar-sort-key-changed', newSortKeys);
    },
    closeSortingMenu() {
      this.showSorting = false; // This will hide the SortingMenu component
  },
    closeExportDropdown() {
    
      this.showDropdown = false; // This will hide the ExportDropdown component
    },

  },
  watch: {
    searchQuery(newQuery, oldQuery) {
    // To avoid unnecessary emissions, check if the newQuery is actually different from oldQuery
    if (newQuery !== oldQuery) {
      
      this.$emit('search-query-updated', newQuery);
      
    }
  }
},
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
  background-image: url("@/assets/header.jpg");
}

.Navbar-container {
  width: 90%; /* Reduce the width to create space on the sides */
  display: flex;
  justify-content: space-between; /* Distribute the items equally */
}
    .hamburger {
  position: relative;
  display: inline-block;
  cursor: pointer;
  transition: 0.5s;
    border: none;
    background-color: transparent;
}

.hamburger i {
  font-size: 35px;
}
.sorting {
  margin-left: 10px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 20px; /* Increase the font size of the sorting icon */

}
.search-bar {
  position: relative;
  margin-left: 10px;
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
  