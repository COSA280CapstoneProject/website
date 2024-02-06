<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>
    <div v-if="isAdmin">
      <AdminPanel></AdminPanel>
    </div>
    <div v-else>
      <p>You are not authorized to view this page.</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AdminPanel from '@/components/AdminPanel.vue';

export default {
  name: 'AdminVue',
  components: {
    AdminPanel
  },
  setup() {
    const store = useStore();

    // Computed property to check if the user is an admin
    const isAdmin = computed(() => store.getters['isAdmin']);

    return {
      isAdmin
    };
  }
};
</script>

<style scoped>
.admin-view {
  padding: 20px;
}

/* Additional styles if needed */
</style>
