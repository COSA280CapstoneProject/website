<template>
  <div class="sorting-dropdown">
      <label class="closedCheck">
          <Checkbox v-model="closedChecked" :binary="true" />
    Show Closed
  </label>
  <label class="RejectedCheck">
          <Checkbox v-model="rejectedCheck" :binary="true" />
    Show Rejected
  </label>
    <h4>Date Posted</h4>
    <Calendar v-model="startDate" showIcon @focus="adjustDatePickerPosition" />
    <Calendar v-model="endDate" showIcon @focus="adjustDatePickerPosition" />
    <h4>Deadline</h4>
    <MultiSelect ref="deadlineYearRef" class="Deadline" v-model="DeadlineY" :options="Years" placeholder="Select Year" />
    <MultiSelect ref="deadlineSeasonRef" class="Deadline" v-model="DeadlineS" :options="Season" placeholder="Select Season" />
    <h4>Program Types</h4>
    <MultiSelect ref="programTypeRef" class="multi-select" v-model="ProgramTypes" :options="ProgramType" placeholder="Select Program Types" />
    <h4>Posting Types</h4>
    <MultiSelect ref="postTypeRef" class="multi-select" v-model="PostType" :options="PostingType" placeholder="Select Posting Types" />
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
      closedChecked: false,
      rejectedCheck: false,
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
      this.$emit('close-Sort');
      
    },
    adjustDatePickerPosition() {
      this.$nextTick(() => {
        const dropdowns = document.querySelectorAll('.p-datepicker');
        dropdowns.forEach((dropdown) => {
          if (dropdown.offsetParent !== null) { // Check if dropdown is visible
            dropdown.style.position = 'fixed';
            dropdown.style.top = '20%'; // Adjust as needed
            dropdown.style.left = '10%px'; // Adjust as needed
          }
        });
      });
    },
    // Method to close the dropdown
    closeDropdown() {
      this.$emit('close-Sort'); // Emit an event to the parent component to close the dropdown
    },
    handleClickOutside(event) {
  // Check if the click was inside the calendar or multiselect components
  const withinCalendar = event.composedPath().some(el => el.classList && el.classList.contains('p-datepicker'));
  const withinMultiselect = event.composedPath().some(el => el.classList && el.classList.contains('p-multiselect-panel'));

  // If the click was outside the dropdown and not within the calendar or multiselect, close the dropdown
  if (!this.$el.contains(event.target) && !withinCalendar && !withinMultiselect) {
    this.closeDropdown();
  }
},


   
  



    
  },
  mounted() {
    // Add a global click event listener when the component is mounted
    document.addEventListener('click', this.handleClickOutside, true);
  },
  beforeUnmount() {
    // Remove the global click event listener when the component is about to be destroyed
    document.removeEventListener('click', this.handleClickOutside, true);
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
  DeadlineY(newDeadlineY) {
    this.sortKeys.DeadlineY = newDeadlineY;
  },
  DeadlineS(newDeadlineS) {
    this.sortKeys.DeadlineS = newDeadlineS;
  },
  closedChecked(newClosedChecked) {
    console.log(newClosedChecked);
    this.sortKeys.closedChecked = newClosedChecked;
  },
  rejectedCheck(newRejectedCheck) {
    this.sortKeys.rejectedCheck = newRejectedCheck;
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
max-width: 10%;

}

::v-deep .p-calendar{
  max-width: 40%;
  margin-right: 10%;
}
::v-deep .p-datepicker{
  position: fixed !important;
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
::v-deep .p-multiselect-panel {
  position: fixed !important; /* Use !important to override default styles */
  top: 20%; /* Adjust based on your layout */
  left: 20%; /* Adjust based on your layout */
  z-index: 1000; /* Ensure dropdown is above other content */
}

</style>