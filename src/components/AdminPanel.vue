<template>
  <div class="admin-panel">
    <h2>Admin Dashboard</h2>

    <!-- Admin Management Section -->
    <section class="admin-management">
      <h3>Manage Admins</h3>
      <button @click="showAddAdminForm = true">Add New Admin</button>
      <div v-if="showAddAdminForm">
        <form @submit.prevent="addAdmin">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" v-model="newAdmin.firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="newAdmin.lastName" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="newAdmin.email" required />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="newAdmin.username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="newAdmin.password" required />
          </div>
          <button type="submit">Add Admin</button>
          <button @click="showAddAdminForm = false">Cancel</button>
        </form>
      </div>
      <ul>
        <li v-for="admin in admins" :key="admin.id">
          {{ admin.firstName }} {{ admin.lastName }} - {{ admin.email }}
          <button @click="removeAdmin(admin.id)">Remove</button>
        </li>
      </ul>
    </section>

    <!-- Resource Requests Section -->
    <section class="resource-requests">
      <h3>Resource Requests</h3>
      <ul>
        <li v-for="request in resourceRequests" :key="request.id">
          {{ request.details }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'AdminPanel',
  setup() {
    const showAddAdminForm = ref(false);
    const newAdmin = ref({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    });
    const admins = ref([]);
    const resourceRequests = ref([]);
    const loading = ref(false);

    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admins');
        admins.value = response.data;
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    const fetchResourceRequests = async () => {
      try {
        const response = await axios.get('/api/resource-requests');
        resourceRequests.value = response.data;
      } catch (error) {
        console.error('Error fetching resource requests:', error);
      }
    };

    const addAdmin = async () => {
      loading.value = true;
      try {
        await axios.post('/api/admins', newAdmin.value);
        await fetchAdmins();
        newAdmin.value = {};
        showAddAdminForm.value = false;
      } catch (error) {
        console.error('Error adding admin:', error);
      } finally {
        loading.value = false;
      }
    };

    const removeAdmin = async (adminId) => {
      loading.value = true;
      try {
        await axios.delete(`/api/admins/${adminId}`);
        await fetchAdmins();
      } catch (error) {
        console.error('Error removing admin:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(async () => {
      await fetchAdmins();
      await fetchResourceRequests();
    });

    return {
      showAddAdminForm,
      newAdmin,
      admins,
      resourceRequests,
      addAdmin,
      removeAdmin,
      loading
    };
  }
};
</script>

<style scoped>
/* Add your styles here */
.admin-panel {
  padding: 1rem;
}

.admin-management, .resource-requests {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
}

input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
