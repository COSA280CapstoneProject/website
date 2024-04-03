<template>
  <div class="container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!postingDetails.length && !error" class="loading-message">Loading posting details...</div>
    <div class="posting-row" v-for="(detail, index) in postingDetails" :key="index">
      <div class="organization">
        <h2>{{ detail.OrgName }}</h2>
        <p><b>Contact name:</b> {{ detail.ContactName }}</p>
        <p><b>Contact email:</b> {{ detail.Email }}</p>
        <p><b>Phone number:</b> {{ formatPhoneNumber(detail.PhoneNum) }}</p>
        <p><b>Post type:</b> {{ detail.PostType }}</p>
        <p><b>Program:</b> {{ detail.ProgramType }}</p>
        <p><b>Start Date:</b> {{ detail.StartDate }}</p>
        <p><b>Post ID:</b> {{ detail.PostID }}</p>
        <p><b>Post Title:</b> {{ detail.PostTitle }}</p>
        <p><b>Season:</b> {{ detail.Season }}</p>
        <p><b>Date Added:</b> {{ detail.DateAdded }}</p>
        <p><b>Status:</b> {{ detail.Status }}</p>
      </div>
      <div class="job-description-1">
        <h2>{{ detail.PostTitle }}</h2>
        <p class="job-description">{{ detail.PostDesc }}</p>
      </div>
      <div>
        <button @click="toggleDropdown(index)">
          <img class="hamburger" src="@/assets/Hamburger_icon.png" />
        </button>
        <div v-show="showMenu[index]" class="dropdown-content">
          <a>Status: <b>{{ detail.Status }}</b></a>
          <br>
          <a href="#" @click.prevent="openEditPopup(detail, index)">Edit</a>
          <br>
          <a href="#" @click.prevent="deletePosting(detail.PostID)">Delete</a>
        </div>
        <div v-if="detail.BlobURL" class="file">
          <div v-for="(url, fileIndex) in detail.BlobURL.split(',')" :key="fileIndex">
            <img src="@/assets/file.png" alt="Download file" class="download-icon" @click="downloadFile(url, 'DownloadedFile')"/>
            <div class="file-name">{{ url.substring(url.lastIndexOf('/') + 1) }} (File {{ fileIndex + 1 }})</div>
          </div>
        </div>
      </div>
    </div>
    <!-- PostingPopupEdit component is conditionally rendered here -->
    <posting-popup-edit
      v-if="showEditPopup"
      :postID="currentEditingPosting.PostID"
      :editing-posting="currentEditingPosting"
      @close="showEditPopup = false">
    </posting-popup-edit>
  </div>
</template>



<script>



import axios from 'axios';
import PostingPopupEdit from '@/components/PostingPopupEdit.vue';

export default {
  components: {
    PostingPopupEdit,
  },
  data() {
    return {
      postingDetails: [],
      error: null,
      showMenu: [],
      showEditPopup: false,
      currentEditingPosting: null,
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
          this.error = error.message;
        });
    },
    toggleDropdown(index) {
      this.showMenu[index] = !this.showMenu[index];
    },
    openEditPopup(detail, index) {
      this.currentEditingPosting = detail;
      this.showEditPopup = true;
      this.showMenu[index] = false;
    },
    deletePosting(postID) {
      axios.post('https://ictdatabasefileupload.azurewebsites.net/api/deleteICTSQLDatabasePostings', { postID })
        .then(response => {
          if (response.status === 200) {
            this.postingDetails = this.postingDetails.filter(post => post.PostID !== postID);
          } else {
            throw new Error(`Failed to delete posting: ${response.statusText}`);
          }
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    submitEditedPosting(editedPosting) {
  const endpointBase = 'https://ictdatabasefileupload.azurewebsites.net/api/';
  const endpoints = {
    contactName: 'editiCTSQLDatabasePostingsContactName',
    email: 'editiCSQLDatabasePostingsEmail',
    orgName: 'editICTSQLDatabasePostingsOrgName',
    phoneNum: 'editICTSQLDatabasePostingsPhoneNum',
    postDesc: 'editICTSQLDatabasePostingsPostDesc',
    postTitle: 'editICTSQLDatabasePostingsPostTitle',
    postType: 'editiCTSQLDatabasePostingsPostType',
    programType: 'editiCTSQLDatabasePostingsProgramtype',
    season: 'editiCTSQLDatabasePostingsSeason',
    startDate: 'editICTSQLDatabasePostingsStartDate',
  };

  // Collect promises for each edit operation
  const editPromises = Object.entries(editedPosting).reduce((promises, [key, value]) => {
    if (endpoints[key]) { // If there's a corresponding endpoint for the field
      const url = `${endpointBase}${endpoints[key]}`;
      // Assuming each endpoint expects { postID, [key]: value } format
      const data = { postID: editedPosting.PostID };
      data[key] = value;
      promises.push(axios.post(url, data));
    }
    return promises;
  }, []);

  // Execute all edit operations
  Promise.all(editPromises)
    .then(() => {
      // If all edits were successful, close the popup and refresh the data
      this.showEditPopup = false;
      this.fetchPostingDetails();
    })
    .catch(error => {
      // Handle errors (e.g., display an error message)
      console.error('An error occurred while submitting the edits:', error);
      this.error = 'An error occurred while submitting the edits. Please try again.';
    });
}
,
    downloadFile(blobUrl, fileName) {
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
.button{
  background: none;
}
.dropdown-content {
  float: left;
  left: 0; /* Align to the left edge of the parent element */
  position: relative;
  background-color: #ffffff; /* White background for the dropdown */
  border: 1px solid #ddd; /* Light grey border */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  border-radius: 4px; /* Rounded corners */
  width: auto; /* Width can be adjusted or set to auto */
  z-index: 1000; /* Ensure it's on top of other elements */
  padding: 1em 0; /* Padding on top and bottom */
  text-align: left;
  right: 100%;
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