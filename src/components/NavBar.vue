

<template>
  <nav class="navbar">
    <div class="right-items">
     <button class="sign-in-btn" @click="signIn">Sign In</button>
      <sign-in-modal :visible="isModalVisible" @close="isModalVisible = false"></sign-in-modal>
    </div>
  </nav>
</template>

<script>
import SignInModal from './SignInModal.vue';
export default {
  name: 'NavBar',
  components: {
    SignInModal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    signIn() {
      // Implement sign-in logic here
      console.log('Sign In button clicked');
      this.isModalVisible = true;
    }
  }
}
</script>

<style>
.navbar {
  display: flex;
  background-color: black;
  justify-content: space-between;
}
.right-items{
  margin-left: auto;
}
.sign-in-btn {
  text-align: right;
  padding: 8px 15px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.sign-in-btn:hover {
  background-color: skyblue;
}
</style>
