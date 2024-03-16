<template>
    <div class="container">
      <!-- Main Content -->
      <div class="content">
        <!-- Error message display -->
        <div v-if="error" class="error-message">{{ error }}</div>
        
        <section class="organization" v-if="!error && postingDetails">
          <h1>Organization</h1>
          <p>Poster name: {{ postingDetails.orgName }}</p>
          <p>Contact email: {{ postingDetails.contactEmail }}</p>
          <p>Phone number: {{ postingDetails.phoneNumber }}</p>
          <p>Post type: {{ postingDetails.postType }}</p>
          <p>Program: {{ postingDetails.program }}</p>
        </section>
  
        <section class="job-description" v-if="!error && postingDetails">
          <h2>Job description</h2>
          <p>{{ postingDetails.description }}</p>
        </section>
  
        <!-- File Download Section -->
        <div class="file-download-section" v-if="!error && postingDetails">
          <button @click="downloadFile" class="download-button">Download File</button>
        </div>
  
        <!-- If there is no posting details and no error, show loading message -->
        <div v-if="!postingDetails && !error" class="loading-message">
          Loading posting details...
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        postingDetails: null,
        isSidebarOpen: false,
        error: null,
      };
    },
    methods: {
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      fetchPostingDetails() {
        axios.get('https://ictdatabasefileupload.azurewebsites.net/api/getPostingDetails')
          .then(response => {
            this.postingDetails = response.data;
          })
          .catch(error => {
            this.error = 'Failed to load posting details: ' + error.message;
          });
      },
      downloadFile() {
        const fileName = this.postingDetails.fileName || 'downloaded_file';
        axios({
          url: 'https://ictdatabasefileupload.azurewebsites.net/api/downloadFile',
          method: 'GET',
          responseType: 'blob',
        }).then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
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
    
    .file-download-section {
        display: flex;
        justify-content: flex-start; /* Align to the left or change as needed */
        padding: 10px 0; /* Add some space above and below the download section */
      }
      
      .download-button {
        background-color: #723281; /* Purple color, matching the theme */
        color: white; /* Text color */
        padding: 10px 20px; /* Padding inside the button */
        border-radius: 5px; /* Rounded corners */
        border: none; /* Remove default border */
        cursor: pointer; /* Pointer cursor on hover */
        font-size: 1em; /* Text size */
        transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effect */
      }
      
      .download-button:hover {
        background-color: #5a1c7a; /* Darker shade of purple for hover effect */
        transform: scale(1.05); /* Slightly enlarge button on hover */
      }
      
      .download-button:active {
        transform: scale(0.98); /* Slightly shrink button on click */
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