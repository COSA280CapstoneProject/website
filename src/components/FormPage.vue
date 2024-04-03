<template>
  <div class="container">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="!postingDetails.length && !error" class="loading-message">Loading posting details...</div>
    <div class="posting-row" v-for="(detail, index) in postingDetails" :key="index">
      <div class="organization">
        <h2>{{ detail.OrgName }}</h2>
        <!-- <p>Organization name: {{ detail.OrgName }}</p> -->
        <p>Contact name: {{ detail.ContactName }}</p>
        <p>Contact email: {{ detail.Email }}</p>
        <p>Phone number: {{ formatPhoneNumber(detail.PhoneNum) }}</p>
        <p>Post type: {{ detail.PostType }}</p>
        <p>Program: {{ detail.ProgramType }}</p>
        <p>Start Date: {{ detail.StartDate }}</p>
        <p>Post ID: {{ detail.PostID }}</p>
        <p>Post Title: {{ detail.PostTitle }}</p>
        <p>Job Description: {{ detail.PostDesc }}</p>
        <p>Season: {{ detail.Season }}</p>
        <p>Date Added: {{ detail.DateAdded }}</p>
        <p>Status: {{ detail.Status }}</p>
      </div>
      <div class="job-description">
        <h2>{{ detail.PostTitle }}</h2>
        <p>{{ detail.PostDesc }}</p>
      </div>
      <div class="file" v-if="detail.BlobURL">
        <h2>File</h2>
        <div v-for="(url, fileIndex) in detail.BlobURL.split(',') " :key="fileIndex">
          <img src="@/assets/file.png" alt="Download file" class="download-icon"
            @click="downloadFile(url, getFileName(url))" />
          <div class="file-name">{{ getFileName(url) }} (File {{ fileIndex + 1 }})</div>
          <div class="file-size">{{ fileSizes[url] }}</div>
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
import moment from 'moment';

export default {
  props: {
    sortKey: Array,
    searchQuery: String,
  },

  data() {
    return {
      postingDetails: [],
      allPostings: [], // Store all postings without filtering
      error: null,
      showErrorPopup: false,
      errorMessage: '',
      fileSizes: {},
      
    };
  },
  
  methods: {
    fetchPostingDetails() {

  // Construct the URL with a query parameter for the search
  const url = `https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings?search=${encodeURIComponent(this.searchQuery)}`;

  axios.get(url)
    .then(response => {
        this.allPostings = response.data; // Store all postings fetched from the backend
      // Filter postings to only include those with a status of 'Open' for display
      this.postingDetails = this.allPostings.filter(posting => posting.Status === 'Open');
      

      // Process BlobURL and file sizes as before
      this.postingDetails.forEach(detail => {
        if (detail.BlobURL) {
          detail.BlobURL.split(',').forEach(url => {
            this.getFileSize(url);
          });
        }
      });
    })
    .catch(error => {
      this.errorMessage = 'Failed to load posting details: ' + error.message;
      this.showErrorPopup = true;
    });
},

    downloadFile(blobUrl, fileName) {
      const urls = blobUrl.split(',').filter(url => url.trim() !== '');
      urls.forEach((url, index) => {
        const link = document.createElement('a');
        link

          .href

          = url;
        const downloadFileName = fileName || 'File';
        link.setAttribute('download', `${downloadFileName} (File ${index + 1})`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    closePopup() {
      this.showErrorPopup = false;
    },
    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
    },

    filterAndLogMatches() {
  // Start with all postings
  let filteredPostings = [...this.allPostings];

  // Apply filters based on the sortKey criteria
  if (this.sortKey) {
    // Filter by PostType
    if (this.sortKey.PostType && this.sortKey.PostType.length) {
      filteredPostings = filteredPostings.filter(posting =>
        this.sortKey.PostType.includes(posting.PostType)
      );
    }

    // Filter by ProgramType
    if (this.sortKey.ProgramType && this.sortKey.ProgramType.length) {
      filteredPostings = filteredPostings.filter(posting =>
        this.sortKey.ProgramType.includes(posting.ProgramType)
      );
    }

    // Filter by Deadline Year
    if (this.sortKey.DeadlineY && this.sortKey.DeadlineY.length) {
      filteredPostings = filteredPostings.filter(posting =>
        this.sortKey.DeadlineY.includes(posting.StartDate)
      );
    }

    // Filter by Season
    if (this.sortKey.DeadlineS && this.sortKey.DeadlineS.length) {
      filteredPostings = filteredPostings.filter(posting =>
        this.sortKey.DeadlineS.includes(posting.Season)
      );
    }

    // Filter by Start Date
if (this.sortKey.startDate) {
  const startDate = moment(this.sortKey.startDate, 'DD/MM/YYYY, HH:mm:ss');
  filteredPostings = filteredPostings.filter(posting => {
    const postingDate = moment(posting.DateAdded, 'DD/MM/YYYY, HH:mm:ss');
    return postingDate.isSameOrAfter(startDate);
  });
}

// Filter by End Date
if (this.sortKey.endDate) {
  const endDate = moment(this.sortKey.endDate, 'DD/MM/YYYY, HH:mm:ss');
  filteredPostings = filteredPostings.filter(posting => {
    const postingDate = moment(posting.DateAdded, 'DD/MM/YYYY, HH:mm:ss');
    return postingDate.isSameOrBefore(endDate);
  });
}
  }

  // Finally, include or exclude postings based on their status
  this.postingDetails = filteredPostings.filter(posting => {
    const isOpen = posting.Status === 'Open';
    const isClosedAndChecked = this.sortKey.closedChecked && posting.Status === 'Closed';
    const isRejectedAndChecked = this.sortKey.rejectedCheck && posting.Status === 'Rejected';

    return isOpen || isClosedAndChecked || isRejectedAndChecked;
  });

  console.log('Filtered postings:', this.postingDetails);
},
    


    getFileSize(url) {
      axios.head(url)
        .then(response => {
          const size = response.headers['content-length'];
          this.fileSizes[url] = this.formatFileSize(size);
        })
        .catch(error => {
          console.error('Failed to get file size: ' + error.message);
          this.fileSizes[url] = 'Unknown size';
        });
    },
    getFileName(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    },
    formatFileSize(size) {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    },
    performSearch() {
    const query = this.searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive search

    // Filter postings based on the search query
    this.postingDetails = this.allPostings.filter(posting => {
      // Check each field for the presence of the search query
      return `${posting.OrgName} ${posting.ContactName} ${posting.Email} ${posting.PhoneNum} ${posting.PostDesc} ${posting.PostID} ${posting.PostTitle} ${posting.PostType} ${posting.ProgramType} ${posting.Season} ${posting.StartDate} ${posting.Status} ${posting.DateAdded}`
        .toLowerCase() // Convert to lowercase to make the search case-insensitive
        .includes(query); // Check if the concatenated string includes the search query
    });
  }
  },
  

  watch: {
    sortKey() {
      console.log('sortKey changed:', this.sortKey);
      this.filterAndLogMatches();
    },
    searchQuery() {
      console.log('searchQuery changed:', this.searchQuery);
    this.performSearch(); // Refetch posting details when searchQuery changes
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

.organization, .job-description ,.file{
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
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 40%;
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