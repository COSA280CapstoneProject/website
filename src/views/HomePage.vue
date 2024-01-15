<template>
  <div class="center-container">
    <button class="center-button" @click="showPopup = true">Click Me</button>
    <PostingPopup v-if="showPopup" @close="showPopup = false" />
  </div>
</template>

<script>
import PostingPopup from '@/components/PostingPopup.vue'

export default {
  name: 'HomePage',
  components: {
    PostingPopup
  },
  data() {
    return {
      showPopup: false
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