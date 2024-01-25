<template>
    <div class="sorting-dropdown">
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
  import 'primevue/resources/themes/saga-blue/theme.css'       //theme
  import 'primevue/resources/primevue.min.css'                 //core css
  import 'primeicons/primeicons.css'                           //icons


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
        showFilled: false,
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
      };
    },
  };
  </script>
  
  <style scoped>
  .sorting-dropdown {
    position: absolute;
    border: 1px solid black;
    width: 500px;
    z-index: 1;
    margin-top: 50px;
    background-color: #f8f9fa;
    margin-left: 50px;
  }
  .multi-select {
    width: 300px; /* Adjust this value as needed */
  }
  
  </style>