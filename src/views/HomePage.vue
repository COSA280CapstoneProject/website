<template>
  <AdminView/>
    <HomeVue/>
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