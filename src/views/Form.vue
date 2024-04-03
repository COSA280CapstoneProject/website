<template>
  <div>
    <FormNavbar @navbar-sort-key-changed="updateSortKey" @search-query-updated="updateSearchQuery" />
    <ExportDropdown v-if="showDropdown" />
    <SortingMenu v-if="showSorting" @close-Sort="closeSortingMenu"/>
    <br>
    <br>
    <div class="form-page-container">
      <FormPage :sortKey="sortKey" :searchQuery="searchQuery"/>

    </div>
  </div>
</template>
  
  <script>
  import FormNavbar from '@/components/FormNavbar.vue'
  import ExportDropdown from '@/components/ExportDropdown.vue';
  import SortingMenu from '@/components/SortingDropdown.vue';
  import FormPage from '@/components/FormPage.vue' ;
  
  export default {
  name: 'FormView',
  components: {
    FormNavbar,
    ExportDropdown,
    SortingMenu,
    FormPage,
    
  },
  data() {
    return {
        showDropdown: false,
        showSorting: false,
        sortKey: null,
        searchQuery: '',
    }
  },
  methods: {
    updateSortKey(newSortKey) {
      this.sortKey = newSortKey;
     
    },
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery; // Update the searchQuery based on the event from FormNavbar
      console.log('updateSearchQuery');
    },


    closeSortingMenu() {
      console.log('closeSortingMenu');
    this.showSorting = false; // This will hide the SortingMenu component
  },
  },
  };




  </script>
  
  <style>
  /* ...existing styles... */
  </style>