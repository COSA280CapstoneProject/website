<template>
    <div>
        <FormNavbar @toggleDropdown="showDropdown = !showDropdown" />
        <ExportDropdown v-if="showDropdown" />
        <SortingMenu v-if="showSorting"/>
    </div>
  </template>
  
  <script>
  import FormNavbar from '@/components/FormNavbar.vue'
  import ExportDropdown from '@/components/ExportDropdown.vue';
  import SortingMenu from '@/components/SortingDropdown.vue';
  
  
  export default {
  name: 'FormView',
  components: {
    FormNavbar,
    ExportDropdown,
    SortingMenu,
    
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