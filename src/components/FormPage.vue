<template>
  <div class="container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!postingDetails.length && !error" class="loading-message">Loading posting details...</div>
    <div class="posting-row" v-for="(detail, index) in postingDetails" :key="index">
      <div class="organization">
        <h2>{{ detail.OrgName }}</h2>
        <p class="bold-text">Contact name: {{ detail.ContactName }}</p>
  <p class="bold-text">Contact email: {{ detail.Email }}</p>
  <p class="bold-text">Phone number: {{ formatPhoneNumber(detail.PhoneNum) }}</p>
  <p class="bold-text">Post type: {{ detail.PostType }}</p>
  <p class="bold-text">Program: {{ detail.ProgramType }}</p>
  <p class="bold-text">Start Date: {{ detail.StartDate }}</p>
  <p class="bold-text">Post ID: {{ detail.PostID }}</p>
  <p class="bold-text">Post Title: {{ detail.PostTitle }}</p>
  <p class="bold-text">Season: {{ detail.Season }}</p>
  <p class="bold-text">Date Added: {{ detail.DateAdded }}</p>
  <p class="bold-text">Status: {{ detail.Status }}</p>
      </div>
      <div class="job-description-1">
        <h2>{{ detail.PostTitle }}</h2>
        <p class="job-description">{{ detail.PostDesc }}</p>
      </div>
      <div v-if="detail.BlobURL" class="file">
        <button @click="toggleDropdown(index)">
          <img class="hamburger" src="@/assets/Hamburger_icon.png" />
        </button>
        <div v-show="showMenu[index]" class="dropdown-content">
          <a href="#">Status: {{ detail.Status }}</a>
          <a href="#">Edit</a>
          <a href="#">Delete</a>
        </div>
        <div v-for="(url, fileIndex) in detail.BlobURL.split(',')" :key="fileIndex">
          <img src="@/assets/file.png" alt="Download file" class="download-icon" @click="downloadFile(url, 'DownloadedFile')"/>
          <div class="file-name">{{ url.substring(url.lastIndexOf('/') + 1) }} (File {{ fileIndex + 1 }})</div>
        </div>
      </div>
    </div>
    <div v-if="showErrorPopup" class="error-popup">
      <div class="error-content">
        <span>{{ errorMessage }}</span>
        <button @click="closePopup" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HamburgerIcon from '@/assets/Hamburger_icon.png';

export default {
  data() {
    return {
      postingDetails: [],
      error: null,
      HamburgerIcon,
      showErrorPopup: false,
      errorMessage: '',
      showMenu: [],
    };
  },
  methods: {
    fetchPostingDetails() {
      axios.get('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings')
      .then(response => {
        this.postingDetails = response.data;
        this.showMenu = new Array(this.postingDetails.length).fill(false);
      })
      .catch(error => {
        this.errorMessage = `Failed to load posting details: ${error.message}`;
        this.showErrorPopup = true;
      });
    },
    toggleDropdown(index) {
      this.showMenu[index] = !this.showMenu[index];
    },
    downloadFile(blobUrl, fileName) {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    closePopup() {
      this.showErrorPopup = false;
    },
    formatPhoneNumber(phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
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
  float: left;
}
.bold-text {
  font-weight: bold;
}
.p{
text-align: left;
display: flex;
  flex-direction: column;
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
.hamburger{
  width: 2.5em;
  background: none;   /* Make the background transparent */
  border: none;       /* Remove the border */
  padding: 0;         /* Remove padding */
  margin: 0;          /* Remove margins */
  cursor: pointer;
}

.organization, .job-description-1 ,.file{
  flex: 1; /* Allows these sections to grow and take equal space */
  margin-right: 20px; /* Adds spacing between organization and job description sections */
  color: #5a1c7a;
  display: flex; /* or 'block' depending on your layout needs */
  flex-direction: column; /* This will ensure each child starts on a new line */
  align-items: flex-start; /* This aligns children (p tags) to the start (left) */
  width: 100%; /* Adjust based on your layout needs */
  padding: 10px; 
}

.organization {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 30%;
}

.job-description {
  flex: 0 0 40%; /* Do not grow, do not shrink, basis at 40% */
  max-width: 40%; /* Confine maximum width to 40% of the parent container */
  padding: 10px; /* Provides spacing inside the container */
  margin-right: 20px; /* Separation from adjacent elements */
  height: 300px; /* Fixed height for the container */
  overflow-y: auto; /* Adds vertical scroll within the element if content overflows */
  background-color: #f8f8f8; /* Background color for the container */
  border: 1px solid #eaeaea; /* Border for the container */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Shadow for visual depth */
  margin-bottom: 20px; /* Space to the next section */
  word-break: break-word; /* Allows words to break and wrap to the next line */
  color: black;
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
  float: left;
}

.file {
  align-items: flex-end;
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

.left-align-text {
  text-align: left;
  display: inline-block; /* Treats the span more like a block for alignment purposes */
  text-align: left;
 
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

.download-icon {
  width: 40%; /* Set width relative to the container */
  height: auto; /* Maintain aspect ratio */
  max-width: 60px; /* Maximum size to avoid too large icon */
  cursor: pointer;
}

.sidebar-button:hover {
  background-color: #5a1c7a;
}
.error-popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  border: 1px solid gray; /* Adds a black border */
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
}


.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  margin-top: 20px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>