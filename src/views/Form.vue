<template>
    <div>
        <FormNavbar @toggleDropdown="showDropdown = !showDropdown" />
        <ExportDropdown v-if="showDropdown" />
        <SortingMenu v-if="showSorting"/>
        <br>
        <br>
        <div class="form-page-container">
          <FormPage />
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
    }
  }
}




  </script>
  
  <style>
  /* ...existing styles... */
  </style>