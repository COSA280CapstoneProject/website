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
    <h4>Deadline</h4>
    <MultiSelect class="Deadline" v-model="DeadlineY" :options="Years" placeholder="Select Year"  />
    <MultiSelect class="Deadline" v-model="DeadlineS" :options="Season" placeholder="Select Season"  />
    <h4>Program Types</h4>
    <MultiSelect class="multi-select" v-model="ProgramTypes" :options="ProgramType" placeholder="Select Program Types" />
    <h4>Posting Types</h4>
    <MultiSelect class="multi-select" v-model="PostType" :options="PostingType" placeholder="Select Posting Types" />
    <h4> 

    </h4>

    <button @click="submitSort" class="submitbtn">Submit Sort</button>
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
      ProgramTypes: null,
      PostType: null,
      DeadlineS: null,
      DeadlineY: null,

      ProgramType: [
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
    PostingType: [
      'Job Placements',
      'Internships',
      'Student Projects',
      // Add more posting types as needed
    ],
    Years: [
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      // Add more years as needed
    ],
    Season: [
      'Spring',
      'Summer',
      'Fall',
      'Winter',
      // Add more seasons as needed
    ],
    sortKeys: {},
    };
  },
  methods: {
    submitSort() {
      this.$emit('sort-key-changed', this.sortKeys);
    },
  },
  watch: {
  startDate(newStartDate) {
    this.sortKeys.startDate = newStartDate;
  },
  endDate(newEndDate) {
    this.sortKeys.endDate = newEndDate;
  },
  ProgramTypes(newSelectedProgramTypes) {
    this.sortKeys.ProgramType = newSelectedProgramTypes;
  },
  PostType(newPostType) {
    this.sortKeys.PostType = newPostType;
  },
},
};
</script>

<style scoped>
.sorting-dropdown {
  position: fixed;
  border: 1px solid black;
  width: 500px;
  z-index: 1;
  margin-top: 50px;
  background-color: #f8f9fa;
  margin-left: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
.multi-select {
  width: 300px; /* Adjust this value as needed */
}
::v-deep  .pi-calendar {
background-color: #732181;

}
::v-deep  .p-button  {
background-color: #732181;
border: #732181;
}
.submitbtn {
  background-color: #732181;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 10px;

}
.submitbtn:hover {
  background-color: #5a1c7a;
}
.Deadline {
  margin-right: 5%;
}


</style>