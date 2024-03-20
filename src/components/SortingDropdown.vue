<template>
  <div class="sorting-dropdown" ref="dropdown">
    <label>
      <Checkbox v-model="checked" :binary="true" />
      Show Filled
    </label>
    <h4>Start Date</h4>
    <Calendar v-model="startDate" showIcon />
    <h4>End Date</h4>
    <Calendar v-model="endDate" showIcon />
    <h4>Program Types</h4>
    <MultiSelect class="multi-select" v-model="selectedProgramTypes" :options="programTypes" placeholder="Select Program Types" />
    <h4>Posting Types</h4>
    <MultiSelect class="multi-select" v-model="selectedPostingTypes" :options="postingTypes" placeholder="Select Posting Types" />
  </div>
</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import MultiSelect from 'primevue/multiselect';

export default {
  components: {
    Calendar,
    Checkbox,
    MultiSelect,
  },
  data() {
    return {
      checked: false,
      startDate: null,
      endDate: null,
      selectedProgramTypes: null,
      selectedPostingTypes: null,
      programTypes: [
        'Software Development',
        'Network Technician',
        'Web Development',
        'Data Analysis',
        'Data Science',
        'Cyber Security',
        'UX/UI Design',
        'Digital Marketing',
        'IT Support',
        'Cloud Computing',
        'Project Management',
        // Add more program types as needed
      ],
      postingTypes: [
        'Job Placement',
        'Internship',
        'Student Project',
        // Add more posting types as needed
      ],
      showSorting: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        // Clicked outside the dropdown, close it
        // You may need to adjust the condition based on your UI structure
        // For example, check if the clicked element is not inside the dropdown
        // You can customize this logic according to your specific requirements
        this.showSorting = false;
      }
    }
  }
};
</script>

<style scoped>
.sorting-dropdown {
  position: absolute; /* Change from absolute to relative */
  right: 0;
  top: 100%; /* Position below its own icon */
  left: 0;
  border: 1px solid black;
  width: 500px;
  z-index: 1000;
  background-color: #f8f9fa;
  padding: 10px;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.multi-select {
  width: 300px; /* Adjust this value as needed */
}

::v-deep .pi-calendar {
  background-color: #732181;
}

::v-deep .p-button {
  background-color: #732181;
  border: #732181;
}
</style>
