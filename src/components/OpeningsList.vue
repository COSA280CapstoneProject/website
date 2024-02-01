<template>
  <div class="openings-list">
    <h2>All Job Openings</h2>
    <ul>
      <li v-for="opening in jobOpenings" :key="opening.id" class="job-opening">
        <h3>{{ opening.jobTitle }}</h3>
        <p>{{ opening.jobDetails }}</p>
        <p><strong>Target Audience:</strong> {{ opening.targetAudience || 'General' }}</p>
        <p><strong>Skills and Education:</strong> {{ opening.skillsEducation }}</p>
        <a :href="opening.applicationMethod" target="_blank">Apply Now</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'OpeningsList',
  setup() {
    const jobOpenings = ref([]);

    const fetchJobOpenings = async () => {
      try {
        const response = await axios.get('/api/job-openings');
        jobOpenings.value = response.data;
      } catch (error) {
        console.error('Error fetching job openings:', error);

      }
    };

    onMounted(fetchJobOpenings);

    return { jobOpenings };
  }
};
</script>

<style scoped>
.openings-list {
  padding: 1rem;
}

.job-opening {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.job-opening h3 {
  margin-top: 0;
}

/* Add more styles as needed */
</style>
