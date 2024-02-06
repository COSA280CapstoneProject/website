<template>
  <div v-if="visible" class="modal">
  <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
<!--    <h2>Sign In</h2>-->
    <h4>Sign in with <b>username@saskpolytech.ca</b></h4>
      <!-- Sign-in form -->
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="credentials.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit">Sign In</button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInModal',
  props: {
    visible: Boolean
  },
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    onSubmit() {
      console.log('Signing in with:', this.credentials);
      //sign-in logic here

      this.closeModal(); // Close the modal after submit
    },
    onSignIn() {
      // Handle sign-in logic
      console.log('Attempt to sign in with', this.username, this.password);

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
  width: 600px;
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

// Form styles
.form-group {
  margin-bottom: 15px;
}

form input {
  padding: 10px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 5px 0 20px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: rgb(38, 114, 236);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 15%;
}

button[type="submit"]:hover {
  opacity: 0.8;
}

</style>