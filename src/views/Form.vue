<template>
    <div>
        <FormNavbar @toggleDropdown="showDropdown = !showDropdown" />
        <ExportDropdown v-if="showDropdown" />
    </div>
  </template>
  
  <script>
  import FormNavbar from '@/components/FormNavbar.vue'
  import ExportDropdown from '@/components/ExportDropdown.vue';
  
  
  export default {
  name: 'FormView',
  components: {
    FormNavbar,
    ExportDropdown,
    
  },
  data() {
    return {
        showDropdown: false,
    }
  }
}




  </script>
  
  <style>
  /* ...existing styles... */
  </style>