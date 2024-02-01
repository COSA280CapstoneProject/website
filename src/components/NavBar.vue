<template>
  <nav class="navbar">
<!--    <h1>hii</h1>-->



    <div class="right-items">
      <button class="sign-in-btn" @click="openModal">Sign In</button>
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
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    }
  }
}
</script>

<style>
.navbar {
  margin-top:0;
  background-image: url("../assets/img.png");
  height: 60px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
}

.container {
//display: flex;
//justify-content: space-between;
//position: fixed;
//top: 0;
//right: 0;

}
.right-items{
  margin-left: auto;
}
.sign-in-btn {
  text-align: right;
  padding: 15px 50px;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font: 20px Arial;
  font-weight: bold;
}

.sign-in-btn:hover {
}
</style>
