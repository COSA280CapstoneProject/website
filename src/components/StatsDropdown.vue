<template>
    <div class="stats-dropdown">
    <button style="position: relative;" @click="toggleDropdown">Toggle Dropdown</button>
      <ul v-if="isOpen" class="dropdown-menu">
        <li v-for="stat in stats" :key="stat.id">{{ stat.label }}</li>
      </ul>
      <h1>Statistics</h1>
      <div class="stats-line">
        <p>Open: {{ openCount }}</p>
      </div>
      <div class="stats-line">
        <p>Job Placement Open: {{ jobPlacementOpenCount }}</p>
      </div>
      <div class="stats-line">
        <p>Internships Open: {{ internshipsOpenCount }}</p>
      </div>
      <hr>
      <div class="stats-line">
        <p>Total Filled: {{ totalFilledCount }}</p>
      </div>
      <div class="stats-line">
        <p>Job Placement Filled: {{ jobPlacementFilledCount }}</p>
      </div>
      <div class="stats-line">
        <p>Internships Filled: {{ internshipsFilledCount }}</p>
      </div>
      <div class="date-range">
        <label for="from">From:</label>
        <input type="text" id="from" v-model="fromDate" />
        <label for="to">To:</label>
        <input type="text" id="to" v-model="toDate" />
        <span class="calendar-icon"></span>
        <span class="calendar-icon"></span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
        stats: [
          { id: 1, label: "Stat 1" },
          { id: 2, label: "Stat 2" },
          { id: 3, label: "Stat 3" },
        ],
        openCount: 0,
        jobPlacementOpenCount: 0,
        internshipsOpenCount: 0,
        totalFilledCount: 0,
        jobPlacementFilledCount: 0,
        internshipsFilledCount: 0,
        fromDate: '',
        toDate: ''
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .stats-dropdown {
    position: absolute;
    left: 0;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0; /* Align to the right side */
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  .stats-dropdown button {
    padding: 5px 10px;
    background-color: #ccc;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .stats-dropdown button:hover {
    background-color: #999;
  }
  
  .stats-line {
    /* Add your styles here */
  }
  
  .date-range {
    /* Add your styles here */
  }
  
  .calendar-icon {
    /* Add your styles here */
  }
  </style>