<template>
  <div class="container">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="!postingDetails.length && !errorMessage" class="loading-message">Loading posting details...</div>
    <div class="posting-row" v-for="(detail, index) in postingDetails" :key="index">
      <div class="organization">
        <h2>{{ detail.OrgName }}</h2>
        <p><b>Contact name:</b> {{ detail.ContactName }}</p>
        <p><b>Contact email:</b> {{ detail.Email }}</p>
        <!-- <p><b>Phone number:</b> {{ formatPhoneNumber(detail.PhoneNum) }}</p> -->
        <p><b>Post type:</b> {{ detail.PostType }}</p>
        <p><b>Program:</b> {{ detail.ProgramType }}</p>
        <!-- <p><b>Start Date:</b> {{ detail.StartDate }}</p> -->
        <p><b>Post ID:</b> {{ detail.PostID }}</p>
        <p><b>Post Title:</b> {{ detail.PostTitle }}</p>
        <!-- <p><b>Season:</b> {{ detail.Season }}</p> -->
        <p><b>Date Added:</b> {{ detail.DateAdded }}</p>
        
      </div>
      <div class="job-description-1">
        <div class="title-and-date">
          <h2 class="post-title">{{ detail.PostTitle }}</h2>
          <h2 class="date">{{ detail.Season }}, {{ detail.StartDate }}</h2>
        </div> 
        <p class="job-description">{{ detail.PostDesc }}</p>
      </div>
      
      <div class="file">
        <div class="hamburger" @click="toggleDropdown(index)" role="button" tabindex="0">
          <img class="hamburger-image"   src="@/assets/Hamburger_icon.png" alt="Menu"/>
        </div>
     
        <div v-show="showMenu[index]" class="dropdown-content">
          <!-- Trigger for Status Dropdown -->
          <div class="statusdropdown-trigger" @click="toggleStatusDropdown(index)" role="button" tabindex="0">
           <a class="editStatus">Edit Status ▼</a> 
          </div>
          
          <!-- Status Dropdown Menu -->
          <div v-show="showStatusDropdown[index]" class="status-options">
            <a href="#" @click.prevent="promptStatusUpdate(detail.PostID, 'Open')">Open</a>
            <a href="#" @click.prevent="promptStatusUpdate(detail.PostID, 'Closed')">Closed</a>
            <a href="#" @click.prevent="promptStatusUpdate(detail.PostID, 'Rejected')">Rejected</a>
          </div>
          
          <div v-if="showStatusUpdatePopup" class="delete-confirmation-popup">
            <div class="delete-confirmation-content">
              <p>Are you sure you want to change the status?</p>
              <button class="statusYes" @click="confirmStatusUpdate">Yes</button>
              <button @click="showStatusUpdatePopup = false">No</button>
            </div>
          </div>
          
          

          <div class="statusdropdown-trigger" @click="toggleAssignProgramDropdown(index)" role="button" tabindex="0">
            <a class="assignProgram">Assign Program ▼</a>
          </div>
        
          <!-- Program Dropdown Menu -->
          <div v-show="showAssignProgramDropdown[index]" class="program-options">
            <select placeholder="Select Here" class="program" v-model="detail.selectedProgram" @change="updateField(detail.PostID, 'programType', detail.selectedProgram)">
              <option disabled value="" selected>Select Program</option>
              <option value="Artificial Intelligence and Data Analytics">Artificial Intelligence and Data Analytics</option>
              <option value="Business Information Systems">Business Information Systems</option>
              <option value="Cloud Computing and Blockchain">Cloud Computing and Blockchain</option>
              <option value="Computer Automated Systems Technician">Computer Automated Systems Technician</option>
              <option value="Computer Networking Technician">Computer Networking Technician</option>
              <option value="Computer Systems Technology">Computer Systems Technology</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Front-End Web Development">Front-End Web Development</option>
              <option value="Graphic Communications">Graphic Communications</option>
              <option value="Interactive Design and Technology">Interactive Design and Technology</option>
              <option value="Library and Information Technology">Library and Information Technology</option>
              <option value="Library Clerk">Library Clerk</option>
              <option value="Media Production">Media Production</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Technology Management">Technology Management</option>
            </select>
          </div>
       

          <!-- Separate Edit Link -->
          <a class="Edit" href="#" @click.prevent="openEditPopup(detail, index)">Edit</a>
        
          <!-- Separate Delete Link -->
          <a class="Delete" href="#" @click.prevent="showDeleteConfirmationPopup(detail.PostID, index)">Delete</a>
        </div>
        <div v-if="showDeleteConfirmation" class="delete-confirmation-popup">
          <div class="delete-confirmation-content">
            <p>Do you want to delete this posting?</p>
            <button class="yes" @click="confirmDelete">Yes</button>
            <button @click="closeDeleteConfirmationPopup">No</button>
          </div>
        </div>
        <p class="status"><b>Status:</b> {{ detail.Status }}</p>
        <div v-if="detail.BlobURL" class="file">
          <div v-for="(url, fileIndex) in detail.BlobURL.split(',')" :key="fileIndex">
            <img src="@/assets/file.png" alt="Download file" class="download-icon" @click="downloadFile(url, 'DownloadedFile')"/>
            <div class="file-name">{{ url.substring(url.lastIndexOf('/') + 1) }} (File {{ fileIndex + 1 }})</div>
            <div class="file-size">{{ fileSizes[url] }}</div>
          </div>
        </div>
      </div>
    </div>
    
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
import moment from 'moment';
import PostingPopupEdit from '@/components/PostingPopupEdit.vue';


export default {
  components: {
    PostingPopupEdit,
    
  },
  props: {
    sortKey: Array,
    searchQuery: String,
  },
  data() {
    return {
      postingDetails: [],
      allPostings: [],
      error: null,
      showMenu: [],
      showEditPopup: false,
      currentEditingPosting: null,
      fileSizes: {},
      showStatusDropdown: [],
      showDeleteConfirmation: false,
      selectedPostID: null,
      showAssignProgramDropdown: [],
      showStatusUpdatePopup: false,
    statusUpdateDetails: {
      postID: null,
      newStatus: '',
    },
      
      ProgramType: [
        'Artificial Intelligence and Data Analytics',
        'Business Information Systems',
        'Cloud Computing and Blockchain',
        'Computer Automated Systems Technician',
        'Computer Networking Technician',
        'Computer Systems Technology',
        'Cyber Security',
        'Front-End Web Development',
        'Graphic Communications',
        'Interactive Design and Technology',
        'Library and Information Technology',
        'Library Clerk',
        'Media Production',
        'Software Developer',
        'Technology Management',
      ],
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
    console.error('Failed to load posting details:', error);
    this.errorMessage = 'Failed to load posting details: ' + error.message;
    this.showErrorPopup = true;
  }); },
  toggleStatusDropdown(index) {
      // Directly set the value at the specified index
      if (this.showStatusDropdown[index] === undefined) {
        // Explicitly add the index to the array with the initial value of false
        this.showStatusDropdown = [
          ...this.showStatusDropdown.slice(0, index),
          false,
          ...this.showStatusDropdown.slice(index + 1)
        ];
      } else {
        // If already initialized, simply toggle the boolean value
        this.showStatusDropdown[index] = !this.showStatusDropdown[index];
      }
    },
    toggleDropdown(index) {
      this.showMenu[index] = !this.showMenu[index];
    },
    openEditPopup(detail, index) {
      this.currentEditingPosting = detail;
      this.showEditPopup = true;
      this.showMenu[index] = false;
    },
    toggleAssignProgramDropdown(index) {
  // Directly set the value at the specified index
  if (this.showAssignProgramDropdown[index] === undefined) {
    // Explicitly add the index to the array with the initial value of false
    this.showAssignProgramDropdown = [
      ...this.showAssignProgramDropdown.slice(0, index),
      false,
      ...this.showAssignProgramDropdown.slice(index + 1)
    ];
  } else {
    // If already initialized, simply toggle the boolean value
    this.showAssignProgramDropdown[index] = !this.showAssignProgramDropdown[index];
  }
},





    
    // Here's the updateField method adapted for your component
    async updateField(postID, fieldName, value) {
      let urlStatus = 'https://ictdatabasefileupload.azurewebsites.net/api/updateICTSQLDatabasePostingsStatus';
      let urlProgram = 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsProgramType';
      const payload = { postID };
      let url;
      if (fieldName === 'status') {
       url= urlStatus;
       
        payload.status = value;
      } else if (fieldName === 'programType') {
       url= urlProgram;
        payload.programType = value;
      } 

      try {
        const response = await axios.post(url, payload);
        if (response.status === 200) {
          console.log(`Successfully updated ${fieldName}`);
          this.fetchPostingDetails(); // Refresh data
        } else {
          console.error(`Failed to update ${fieldName}: Server responded with status ${response.status}`);
        }
      } catch (error) {
        console.error(`Error updating ${fieldName}:`, error);
        this.error = `Failed to update ${fieldName}. ` + error.message;
      }
    },

    showDeleteConfirmationPopup(postID) {
  this.selectedPostID = postID;
  this.showDeleteConfirmation = true;
},
promptStatusUpdate(postID, newStatus) {
  this.statusUpdateDetails.postID = postID;
  this.statusUpdateDetails.newStatus = newStatus;
  this.showStatusUpdatePopup = true;
},

async confirmStatusUpdate() {
    await this.updateField(
      this.statusUpdateDetails.postID,
      'status',
      this.statusUpdateDetails.newStatus
    );
    this.showStatusUpdatePopup = false;
  },

confirmDelete() {
  if (this.selectedPostID) {
    this.deletePosting(this.selectedPostID);
  }
  this.closeDeleteConfirmationPopup();
},
closeDeleteConfirmationPopup() {
  this.showDeleteConfirmation = false;
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
  const endpointBase = 'https://ictdatabasefileupload.azurewebsites.net/api/'; // Base URL for all endpoints
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
     status: 'https://ictdatabasefileupload.azurewebsites.net/api/updateICTSQLDatabasePostingsStatus',

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
      if (!phoneNumber) return '';
      const match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
      return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
    },

    filterAndLogMatches() {
      try{
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
  }if (filteredPostings.length === 0) {
      this.errorMessage = 'No postings match your filter criteria.';
      console.log('No postings match your filter criteria.');
    }
    else {
      this.errorMessage = null; // Reset the error message if postings are found
    }

  // Finally, include or exclude postings based on their status
  this.postingDetails = filteredPostings.filter(posting => {
    const isOpen = posting.Status === 'Open';
    const isClosedAndChecked = this.sortKey.closedChecked && posting.Status === 'Closed';
    const isRejectedAndChecked = this.sortKey.rejectedCheck && posting.Status === 'Rejected';
    

    return isOpen || isClosedAndChecked || isRejectedAndChecked;
    
  });
} catch (error) {
  this.errorMessage = 'An error occurred while filtering the postings.';
}
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
    if (this.postingDetails.length === 0) {
    this.errorMessage = 'No results found for your search.';
  }
  else {
    this.errorMessage = null; // Reset the error message if postings are found
  }

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

.button{
  background: none;
}



.dropdown-content {
  /* existing styles */
  background-color: #ffffff; /* Set your desired dropdown background color */
  border-radius: 5px; /* Rounded corners for the dropdown */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  padding: 10px; /* Spacing around the content */
}

.dropdown-content a {
  display: block; /* Each link will take up the full width of the dropdown */
  padding: 8px 15px; /* Spacing inside each link for clickable area */
  margin: 5px 0; /* Spacing between each link */
  background-color: #f9f9f9; /* Slightly off-white background for each link */
  color: #333; /* Darker text for better readability */
  text-decoration: none; /* No underlines on the links */
  border-radius: 4px; /* Slightly rounded corners for the link backgrounds */
  transition: background-color 0.3s ease; /* Smooth background color transition for hover effect */
}

/* This will target any <a> with a class of 'Edit' or 'Delete' within .dropdown-content on hover */
  .dropdown-content a.Edit:hover, .dropdown-content a.Delete:hover {
    background-color: #e0e0e0; /* A light grey for the hover state */
  }
  

.dropdown-content a b {
  font-weight: bold;
}

/* Optional: Add a little more styling for the "Status" which isn't a button, but informative text */
.dropdown-content a.status-text {
  background-color: transparent; /* No background for informational text */
  pointer-events: none; /* Prevents clicking on the informational text */
  margin: 0; /* Reset margin for informational text */
  padding-left: 0; /* Reset padding for informational text */
}

.dropdown-content a:not(.status-text):hover {
  background-color: #e0e0e0; /* Only apply hover effect to clickable items */
}

.statusdropdown :hover{
  color: inherit; /* Keeps the text color the same on hover */
  background-color: inherit; /* Keeps the background color the same on hover */
 

}

.organization, .job-description-1 {
  flex: 1; /* Allows these sections to grow and take equal space */
  margin-right: 20px; /* Adds spacing between organization and job description sections */
  color: #5a1c7a;
  display: flex; /* or 'block' depending on your layout needs */
  flex-direction: column; /* This will ensure each child starts on a new line */
  align-items: flex-start; /* This aligns children (p tags) to the start (left) */
  width: 100%; /* Adjust based on your layout needs */
  padding: 10px; 
}

.file{
  flex: 1; /* Allows these sections to grow and take equal space */
  margin-right: 20px; /* Adds spacing between organization and job description sections */
  color: #5a1c7a;
  display: flex; /* or 'block' depending on your layout needs */
  flex-direction: column; /* This will ensure each child starts on a new line */
  align-items: flex-start; /* This aligns children (p tags) to the start (left) */
  width: 100%; /* Adjust based on your layout needs */
  padding: 10px; 
  float: left;

}

.organization {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 30%;
}

.job-description {
  flex: 0 0 40%; /* Do not grow, do not shrink, basis at 40% */
  max-width: 100%; /* Confine maximum width to 100% of the parent container */
  text-align: left;
  height: 300px; /* Fixed height for the container */
  overflow-y: auto; /* Adds vertical scroll within the element if content overflows */
  margin-bottom: 20px; /* Space to the next section */
  word-break: break-word; /* Allows words to break and wrap to the next line */
  color: black;
 
  line-height: 1.6; /* Adjust line height for better readability */
  white-space: pre-line; /* Respects new lines in the text content */
}

.job-description p {
  margin-bottom: 1em; /* Adds space below each paragraph */
}





.status-options {
 
  position: absolute; /* Position it relative to its trigger */
  background-color: #fff; /* White background */
  width: 10.5em; /* Minimum width */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  border-radius: 4px; /* Rounded corners */
  z-index: 100; /* Higher z-index to be on top of other elements */
  margin-top: 5px; /* Give some space from the trigger */
  margin-right: 1em;

}

.status-options a {
  color: #333; /* Dark text color for better readability */
 width: 9.5em;
 align-items: center;
 margin-left: 0.5em;
  text-decoration: none; /* No underline */
  display: block; /* Block level - takes the full width */
  border-bottom: 1px solid #eaeaea; /* Separator between options */
}

.status-options a:last-child {
  border-bottom: none; /* No border for the last option */
}

.status-options a:hover {
  background-color: #f7f7f7; /* Light background on hover */
}






.multi-select{
  width: 10em;
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
  align-items: center;
  align-content: center;
}
.file-image { /* This is the class for the file images */
  margin-left: auto; /* This pushes the image to the right */
}
.hamburger img {

  width: 4em;     /* Set the width of the hamburger icon */
  position: relative; /* Position relative for z-index to take effect */
padding-left: 1.8em;
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
.error-message {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  color: black;
  border: 1px solid rgb(0, 0, 0); /* Adds a black border */
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
  
}
.status{
  color: black;
}

.date{
  margin-left: 9em;
  font-weight: bold;
  max-width: 3em;
  text-align: right;
 text-align-last: right;
}
.job-description-1 .title-and-date {
  display: flex; /* Use flexbox to lay out the children in a row */
  align-items: center; /* Align the items vertically */
  justify-content: start; /* Start alignment of the items */
  flex-wrap: wrap; /* Allow the items to wrap to the next line on small screens */
}

.job-description-1 {
  margin-right: 10px; /* Add space between the post title and the date */
  /* Adjust the margin as needed */
}
.post-title {
  max-width: 11em;
}
.job-description-1 .date {
  white-space: nowrap; /* Prevent the date from wrapping */
  /* If you want the date to be less prominent, you could add additional styling */
  font-weight: bold; /* Less bold than the title */
  font-size: 0.9em; /* Smaller font size */
}

/* Ensure the job description still appears as a block-level element */
.job-description-1 .job-description {
  /* your existing styles for job-description */
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.delete-confirmation-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 5px black;
  border:black;
  display: flex;
  box-shadow: #333;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  outline-width: 3px solid black;
}

.delete-confirmation-content {
  background: #fff; /* White background for the popup */
  padding: 30px;
  border-radius: 5px; /* Rounded corners for the popup */
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /* Enhanced box-shadow for 3D effect */
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.delete-confirmation-content:hover {
  transform: scale(1.05); /* Slightly enlarge the popup on hover */
}



.delete-confirmation-content p {
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
}

.delete-confirmation-content button {
  border: none;
  border-radius: 20px; /* Rounded corners for buttons */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0 10px; /* Space between buttons */
  min-width: 100px; /* Minimum width so buttons are not too small */
  background-color: #6c757d; /* Default color for both buttons */
  color: white; /* Default text color for both buttons */
}

.delete-confirmation-content .yes {
  border: none;
  border-radius: 20px; /* Rounded corners for buttons */
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0 10px; /* Space between buttons */
  
  color: white; /* White text color */
  min-width: 100px; /* Minimum width so buttons are not too small */
}

.delete-confirmation-content .yes:hover {
  background-color: #c82333; /* Darker red on hover */
}

/* Hover effect for 'No' button */
.delete-confirmation-content button:last-child:hover {
  background-color: #5a6268; /* Darker grey background on hover */
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
.program-options .program {
  width: 12.5em;
  height: 2em;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #ffffff;
  box-sizing: border-box; /* Makes sure the padding doesn't affect the total width */
  cursor: pointer;
  appearance: none; /* Disables the native dropdown styling */
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg width="14px" height="12px" viewBox="0 0 1200 1000" xmlns="http://www.w3.org/2000/svg"><path fill="%23333" d="M1108 271H92c-23 0-44 14-44 32 0 25 19 41 44 41h1016c24 0 44-16 44-41 0-18-20-32-44-32z"/></svg>'); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: black;
}

.program-options .program:hover,
.program-options .program:focus {
  border-color: #666666;
  box-shadow: 0 0 0 3px rgba(102, 102, 102, 0.3);
  outline: none;
  color: black;
}

/* For the options */
.program-options .program option {
  padding: 10px;
}

.statusYes{
  background-color: #dc3545; 
}
.statusYes:hover{

 background-color: #c82333; /* Darker red on hover */
}
</style>