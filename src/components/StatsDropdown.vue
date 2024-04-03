<template>
  <div class="stats-dropdown">
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
    <div class="stats-line">
      <p>Student Projects Open: {{ studentProjectsOpenCount }}</p>
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
    <div class="stats-line">
      <p>Student Projects Filled: {{ studentProjectsFilledCount }}</p>
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
      studentProjectsOpenCount: 0,
      totalFilledCount: 0,
      jobPlacementFilledCount: 0,
      internshipsFilledCount: 0,
      studentProjectsFilledCount: 0,
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
  },
  created() {
    fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings')
      .then(response => response.json())
      .then(data => {
        data.forEach(posting => {
          if (posting.Status === 'Open') {
            this.openCount++;
            if (posting.PostType === 'Job Placement') this.jobPlacementOpenCount++;
            if (posting.PostType === 'Internships') this.internshipsOpenCount++;
            if (posting.PostType === 'Student Projects') this.studentProjectsOpenCount++;
          } else if (posting.Status === 'Closed') {
            this.totalFilledCount++;
            if (posting.PostType === 'Job Placement') this.jobPlacementFilledCount++;
            if (posting.PostType === 'Internships') this.internshipsFilledCount++;
            if (posting.PostType === 'Student Projects') this.studentProjectsFilledCount++;
          }
        });
      });
  },
};
</script>

<style scoped>
.stats-dropdown {
  position: absolute;
  top: 61px;
  background-color: #fff;
  border: 1px solid black;
  padding: 20px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
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

</style>
