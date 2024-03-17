<template>
  <div class="container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!postingDetails.length && !error" class="loading-message">Loading posting details...</div>

    <div class="posting-row" v-for="(detail, index) in postingDetails" :key="index">
      <div class="organization">
        <h2>Organization</h2>
        <p>Poster name: {{ detail.OrgName }}</p>
        <p>Contact email: {{ detail.ContactName }}</p>
        <p>Phone number: {{ detail.PhoneNum }}</p>
        <p>Post type: {{ detail.PostType }}</p>
        <p>Program: {{ detail.ProgramType }}</p>
      </div>

      <div class="job-description">
        <h2>Job description</h2>
        <p>{{ detail.PostDesc }}</p>
      </div>
<div class="File">
  <h2>File</h2>
      <div v-if="detail.FileID" class="file-download">
        <button @click="downloadFile(detail.FileID)" class="download-button">Download File</button>
      </div>
    </div>
    </div>
    <br><br><br><br>
  </div>
  
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      postingDetails: [], // Now expects an array
      isSidebarOpen: false,
      error: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    fetchPostingDetails() {
      axios.get('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings')
        .then(response => {
          this.postingDetails = response.data; // Assuming the API returns an array
        })
        .catch(error => {
          this.error = 'Failed to load posting details: ' + error.message;
        });
    },
    downloadFile(fileID) {
      const fileName = 'downloaded_file'; // Placeholder file name
      axios({
        url: `https://ictdatabasefileupload.azurewebsites.net/api/ICTFileUpload/${fileID}`, // Adjusted to a hypothetical download endpoint
        method: 'GET',
        responseType: 'blob',
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // Can adjust fileName based on response if needed
        document.body.appendChild(link);
        link.click();
        link.remove();
      }).catch(error => {
        this.error = 'Failed to download the file: ' + error.message;
      });
    },
  },
  mounted() {
    this.fetchPostingDetails();
  },
};
</script>


  
  
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  padding: 5%;
}

.posting-row {
  display: flex;
  flex-direction: row; /* Change to row to align items side by side */
  justify-content: space-between; /* Distribute space between and around content items */
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #eee; /* Adds a line to separate postings */
}

.organization, .job-description ,.File{
  flex: 1; /* Allows these sections to grow and take equal space */
  margin-right: 20px; /* Adds spacing between organization and job description sections */
  color: #5a1c7a;
}

.file-download-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.organization p, .job-description p {
  font-size: 1em;
  margin-bottom: 5px;
  color: black;
}

.download-button {
  background-color: #723281; /* Purple color, matching the theme */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;
}

.download-button:hover {
  background-color: #5a1c7a;
  transform: scale(1.05);
}

.download-button:active {
  transform: scale(0.98);
}

.status-button {
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  background-color: #652C91;
  color: white;
  text-align: center;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  z-index: 200;
}

.sidebar-button {
  background-color: #652C91;
  color: white;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: #5a1c7a;
}
</style>
