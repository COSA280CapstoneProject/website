<template>
  <div class="container">
    <!-- Main Content -->
    <div class="content">
      <section class="organization">
        <h1>Organization</h1>
        <p>Poster name: Company ABC</p>
        <p>Contact email: contact@abc.com</p>
        <p>Phone number: 123-456-7890</p>
        <p>Post type: Full-Time</p>
        <p>Program: Computer Science</p>
      </section>

      <section class="job-description">
        <h2>Job description</h2>
        <p>Here is the job description... The internship would run from May to August 2024.</p>

      </section>

      <!-- File upload section -->
      <section class="file-upload-section">
        <label for="file-upload" class="file-upload-label">Choose File</label>
        <input id="file-upload" type="file" @change="handleFiles" multiple>
        <div class="file-names">
          <p v-for="(file, index) in files" :key="index">{{ file.name }}</p>
        </div>
      </section>
    </div>

    <!-- Status Button -->
    <button class="status-button" @click="toggleSidebar">
      Status
    </button>

    <!-- Sidebar -->
    <aside v-show="isSidebarOpen" :class="{ 'active': isSidebarOpen }">
      <div>
        <h3>Status</h3>
        <ul class="status-list">
          <li>New/Pending/Filled/Rejected</li>
        </ul>
        <button class="sidebar-button">Edit</button>
        <button class="sidebar-button">Export</button>
        <button class="sidebar-button">Delete</button>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      files: [],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleFiles(event) {
      this.files = Array.from(event.target.files).slice(0, 3);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  display: flex;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 5%;
}

.content {
  display: flex;
  width: 95%;
  align-items: flex-start;
}

.organization, .job-description, .file-upload-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5%;
}

.organization {
  flex: 3; /* Takes 30% of the content width */
}

.job-description {
  flex: 5; /* Takes 50% of the content width */
  float: left;
}

.file-upload-section {
  flex: 0.5; /* Takes 5% of the content width */
  align-items: bottom;
}

.file-upload-label {
  background-color: #652C91; /* Purple color */
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  float: left;
}

.file-upload-label:hover {
  background-color: #5a1c7a; /* Darker shade of purple for hover effect */
}

#file-upload {
  display: none;
}

.file-names {
  margin-top: 10px;
}

.status-button {
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  width: 20%;
  background-color: #fff;
  text-align: center;
  border: 1px solid #ddd;
  z-index: 200;
  padding: 10px;
  border-radius: 5px;
  background-color: #652C91; /* Purple color */
  color: white;
}

aside {
  width: 250px;
  position: fixed;
  right: -250px;
  top: 0;
  bottom: 0;
  background: #fff;
  transition: right 0.3s ease-in-out;
  z-index: 100;
  padding: 20px;
}

aside.active {
  right: 0;
}

.organization h1, .job-description h2 {
  color: #652C91;
}

.organization p, .job-description p {
  font-size: 1em;
}

.status-list {
  list-style-type: none;
  padding: 0;
}

.status-list li {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.sidebar-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: #652C91; /* Purple color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: #5a1c7a; /* Darker shade of purple for hover effect */
}
</style>
