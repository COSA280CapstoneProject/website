<template>
   <NavBar/>
    <HomeVue/>
  </template>

<script>

import NavBar from '@/components/NavBar.vue'
import HomeVue from '@/components/HomeVue.vue'


export default {
  name: 'HomePage',
  components: {
   NavBar, HomeVue
  },
  data() {
    return {
      showPopup: false
    }
  },
}
</script>

<style scoped>



</style>@/components/NavBarvue