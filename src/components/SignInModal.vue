<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>Sign In Form Here</p>
      <!-- Add your sign-in form -->
<!--      <form>-->
<!--        <div class="form-group">-->
<!--          <label for="username">Username:</label>-->
<!--          <input type="text" id="username" v-model="credentials.username" required>-->
<!--        </div>-->
<!--        <div class="form-group">-->
<!--          <label for="password">Password:</label>-->
<!--          <input type="password" id="password" v-model="credentials.password" required>-->
<!--        </div>-->
<!--        <button type="submit">Sign In</button>-->
<!--      </form>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInModal',
  props: {
    visible: Boolean
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>


<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>