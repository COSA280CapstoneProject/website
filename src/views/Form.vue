<template>
    <div>
      <FormNavbar />
      <StatsPopup />
    </div>
  </template>
  
  <script>
  import FormNavbar from '@/components/FormNavbar.vue'
  import StatsPopup from '@/components/StatsPopup.vue'
  
  export default {
    name: 'FormView',
    components: {
      FormNavbar,
      StatsPopup
    }
    // ...existing code...
  }

  


  </script>
  
  <style>
  /* ...existing styles... */
  </style>