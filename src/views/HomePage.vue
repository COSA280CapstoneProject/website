<template>
  <AdminView/>
    <HomeVue/>
    <h1>
      Welcome to the Home Page
    </h1>
  </template>

<script>

import AdminView from '@/components/AdminView.vue'
import HomeVue from '@/components/HomeVue.vue'


export default {
  name: 'HomePage',
  components: {
    AdminView, HomeVue
  },
  data() {
    return {
      showPopup: false
    }
  },
}
</script>

<style scoped>



</style>