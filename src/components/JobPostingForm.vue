<template>
  <div class="job-posting-form">
    <h2>Submit a Job Posting</h2>
    <form @submit.prevent="submitJobPosting">
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" id="jobTitle" v-model="jobPosting.jobTitle" required />
      </div>

      <div class="form-group">
        <label for="jobDetails">Job Details</label>
        <textarea id="jobDetails" v-model="jobPosting.jobDetails" required></textarea>
      </div>

      <div class="form-group">
        <label for="targetAudience">Target Audience</label>
        <input type="text" id="targetAudience" v-model="jobPosting.targetAudience" />
      </div>

      <div class="form-group">
        <label for="skillsEducation">Skills and Education Required</label>
        <textarea id="skillsEducation" v-model="jobPosting.skillsEducation" required></textarea>
      </div>

      <div class="form-group">
        <label for="applicationMethod">Application Method</label>
        <input type="text" id="applicationMethod" v-model="jobPosting.applicationMethod" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Submit Job Posting' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'JobPostingForm',
  setup() {
    const loading = ref(false);
    const jobPosting = ref({
      jobTitle: '',
      jobDetails: '',
      targetAudience: '',
      skillsEducation: '',
      applicationMethod: ''
    });

    const submitJobPosting = async () => {
      loading.value = true;
      try {
        await axios.post('/api/job-postings', jobPosting.value);
        // Reset form after submission
        jobPosting.value = {};
        // Optionally, redirect or show a success message
      } catch (error) {
        console.error('Error submitting job posting:', error);
        // Handle submission error
      } finally {
        loading.value = false;
      }
    };

    return { jobPosting, submitJobPosting, loading };
  },
};
</script>

<style scoped>
.job-posting-form {
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

input[type="text"], textarea {
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
