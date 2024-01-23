<template>
  <AdminView/>
    <div class="center-container">
      <button class="center-button" @click="showPopup = true">Click Me</button>
      <PostingPopup v-if="showPopup" @close="showPopup = false" />
    </div>
  </template>

<script>
import PostingPopup from '@/components/PostingPopup.vue'
import AdminView from '@/components/AdminView.vue'

export default {
  name: 'HomePage',
  components: {
    PostingPopup, AdminView
  },
  data() {
    return {
      showPopup: false
    }
  },
    methods: {
        goToAdminLogin() {
        this.$router.push('/AdminLogin.vue');
        }
    }
}
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center-button {
  padding: 10px 20px;
}
</style>