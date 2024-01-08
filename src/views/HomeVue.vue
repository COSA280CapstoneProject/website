<template>
  <div class="home">
    <h1>Welcome to ICT Agency</h1>
    <!-- img src="@/assets/company-logo.png" alt="Company Logo" /--->

    <!-- Introduction or Overview of the Website -->
    <section class="introduction">
      <p>Our goal is to find the best resources for companies across various industries.</p>
      <p>Learn more about our history and mission.</p>
      <!-- Include more text or components as needed -->
    </section>

    <!-- Video Advertisement -->
    <section class="video-ad">
      <h2>Explore Our Services</h2>
      <video controls>
        <source src="path-to-your-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </section>

    <!-- Quick Job Posting Form -->
    <section class="quick-posting">
      <h2>Post a Job Opening</h2>
      <JobPostingForm></JobPostingForm>
    </section>
  </div>
</template>

<script>
import JobPostingForm from '@/components/JobPostingForm.vue';

export default {
  name: 'HomeVue',
  components: {
    JobPostingForm
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 1rem;
}

.introduction {
  margin-top: 2rem;
}

.video-ad {
  margin-top: 2rem;
}

.quick-posting {
  margin-top: 2rem;
}

/* Add more styles as per your design */
</style>
