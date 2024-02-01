<template>
  <div class="all-openings">
    <h1>All Job Openings</h1>
    <OpeningsList></OpeningsList>
  </div>
</template>

<script>
import OpeningsList from '@/components/OpeningsList.vue';

export default {
  name: 'AllOpenings',
  components: {
    OpeningsList
  }
};
</script>

<style scoped>
.all-openings {
  margin: 20px;
  padding: 20px;
}

/* Additional styles if needed */
</style>
