<template>
  <div class="resource-request-form">
    <h2>Request a Resource</h2>
    <form @submit.prevent="submitRequest">
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" id="companyName" v-model="request.companyName" required />
      </div>

      <div class="form-group">
        <label for="contactName">Contact Name</label>
        <input type="text" id="contactName" v-model="request.contactName" required />
      </div>

      <div class="form-group">
        <label for="contactEmail">Contact Email</label>
        <input type="email" id="contactEmail" v-model="request.contactEmail" required />
      </div>

      <div class="form-group">
        <label for="resourceDetails">Resource Details</label>
        <textarea id="resourceDetails" v-model="request.resourceDetails" required></textarea>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Submit Request' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'ResourceRequestForm',
  setup() {
    const loading = ref(false);
    const request = ref({
      companyName: '',
      contactName: '',
      contactEmail: '',
      resourceDetails: ''
    });

    const submitRequest = async () => {
      loading.value = true;
      try {
        await axios.post('/api/resource-requests', request.value);
        request.value = {}; // Reset the form after successful submission
        // Optionally, display a success message or redirect
      } catch (error) {
        console.error('Error submitting resource request:', error);
        // Handle submission error
      } finally {
        loading.value = false;
      }
    };

    return { request, submitRequest, loading };
  },
};
</script>

<style scoped>
.resource-request-form {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"], input[type="email"], textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5cb85c;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
