<template>
  <div class="login-form">
    <h2>Admin Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            v-model="credentials.username"
            required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="credentials.password"
            required
        />
      </div>
      <div class="form-actions">
        <button type="submit" :disabled="loading">
          Login
        </button>
        <router-link to="/reset-password">Forgot Password?</router-link>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const store = useStore();
    const router = useRouter();
    const credentials = ref({ username: '', password: '' });
    const loading = ref(false);
    const errorMessage = ref('');

    const handleLogin = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        // Call the login action from your Vuex store
        await store.dispatch('login', credentials.value);
        // Redirect to the admin dashboard after successful login
        router.push({ name: 'AdminDashboard' });
      } catch (error) {
        errorMessage.value = error.response.data.message || 'Login failed';
      } finally {
        loading.value = false;
      }
    };

    return {
      credentials,
      loading,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  margin-top: 1rem;
}

.form-actions button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5cb85c;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.form-actions button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.form-actions a {
  margin-left: 1rem;
  text-decoration: none;
  color: #007bff;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
