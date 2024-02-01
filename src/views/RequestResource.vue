<template>
  <div class="request-resource">
    <h1>Request a Resource</h1>
    <p>If you're looking for specific skills or talents, fill out the form below to submit your request.</p>
    <ResourceRequestForm></ResourceRequestForm>
  </div>
</template>

<script>
import ResourceRequestForm from '@/components/ResourceRequestForm.vue';

export default {
  name: 'RequestResource',
  components: {
    ResourceRequestForm
  }
};
</script>

<style scoped>
.request-resource {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Additional styles if needed */
</style>
