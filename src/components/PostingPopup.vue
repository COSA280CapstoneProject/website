<template>
  <div class="background" @click="goBack">
    <div v-if="isPopupActive" class="overlay"></div>
    <div v-bind:class="{ 'Postings': isPopupActive }">
      <div class="Postings" @click.stop> 
  <div class="Postings">
    <Toast v-model="toast" position="top-right" />
    <h1>Create Posting</h1>
    <div class="input-group">
      <div class="org-contact-container">
        <div class="orgName">
          <label for="orgName">Organization Name </label>
          <input type="text" id="orgName" name="orgName" v-model="orgName">
        </div>
        <div class="contactName">
          <label for="contactName">Contact Name </label>
          <input type="text" id="contactName" name="contactName" v-model="contactName">
        </div>
      </div>
      <div class="contact-info-container">
        <div class="email">
          <label for="email">Email </label>
          <input type="text" id="email" name="email" v-model="email">
        </div>
        <div class="phoneNumber">
          <label for="phoneNumber">Phone Number </label>
          <input type="text" id="phoneNum" name="phoneNum" v-model="phoneNum">
        </div>
      </div>
      <div class="posting type">
        <div>
          <label for="postingType">Type of Posting </label>
          <select id="postingType" name="postingType" v-model="programType">
            <option value="Student Projects">Student Projects</option>
            <option value="Internships">Internships</option>
            <option value="Job Placements">Job Placements</option>
          </select>
        </div>
      </div>
      <div class="startDate">
        <div class="start-date-container">
          <label for="startDate">Start Date </label>
          <div class="date-inputs">
            <select id="Year" name="Year" v-model="startDate">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <select id="Season" name="Season" v-model="season">
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>
        </div>
      </div>
      <div class="Title">
        <label for="Title">Title </label>
        <input type="text" id="Title" name="Title" v-model="postTitle">
      </div>
      <div class="Description">
        <label for="Description">Description </label>
        <input type="text" id="Description" name="Description" v-model="postDesc">
      </div>
      <div class="FileUpload">
        <div class="drag-drop-box" @dragover.prevent="onDragOver" @drop.prevent="onDrop" @click="$refs.fileUpload.click()">
          <p class="remove-instruction" v-if="fileDataUrl.length">Tap on the icon to remove file from box</p>
          <div class="center-text" v-if="!fileDataUrl.length">Drag & Drop Image Here or Choose</div>
          <div class="file-info" v-for="(url, index) in fileDataUrl" :key="index">
            <img :src="getPreviewImage(index)" class="preview-image" :title="fileName[index]" @click="removeFile(index, $event)" />
            <p>{{ fileName[index] }} ({{ getFileSize(index) }})</p>
          </div>
        </div>
        <input type="file" id="fileUpload" name="fileUpload" ref="fileUpload" @change="onFileChange" style="display: none" multiple>
      </div>
      <div class="submit">
        <button @click="submitForm">Submit</button>
      </div>
      <div class="close-button">
        <button class="close-button" @click="goBack">X</button>
      </div>
    </div>
  </div>
  </div>
</div>
</div>
</template>
 
<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
    data() {
    return {
      isPopupActive: false,
    };
  },
  methods: {
    openPopup() {
      this.isPopupActive = true;
    },
    closePopup() {
      this.isPopupActive = false;
    },
  },
  components: {
      Toast
    },
  setup(props, { emit }) {
    const toast = useToast();
    const fileName = ref([]);
    const fileDataUrl = ref([]);
    const fileSize = ref([]);
    const fileObjects = ref([]);
    const orgName = ref('');
    const contactName = ref('');
    const phoneNum = ref('');
    const startDate = ref('');
    const postID = ref('');
    const postTitle = ref('');
    const postDesc = ref('');
    const programType = ref('');
    const postType = ref('');
    const files = ref('');
    const status = ref('');
    const email = ref('');
    const season = ref('');
    const dateAdded = ref('');

    const goBack = () => {
      emit('close');
    };

    const onDragOver = (e) => {
      e.preventDefault();
    };

    const onDrop = (e) => {
      e.preventDefault();
      onFileChange(e);
    };

    const getPreviewImage = (index) => {
      if (fileDataUrl.value[index].startsWith('data:image')) {
        return fileDataUrl.value[index];
      } else {
        return require('@/assets/file.png'); 
      }
    };

    // Clear the form when the user submits the form
    const clearForm = () => {
      orgName.value = '';
      contactName.value = '';
      phoneNum.value = '';
      startDate.value = '';
      postID.value = '';
      postTitle.value = '';
      postDesc.value = '';
      programType.value = '';
      postType.value = '';
      files.value = '';
      status.value = '';
      email.value = '';
      season.value = '';
      dateAdded.value = '';
      fileName.value = [];
      fileDataUrl.value = [];
      fileSize.value = [];
      fileObjects.value = [];
    };

    const removeFile = (index, event) => {
      event.stopPropagation();
      fileDataUrl.value.splice(index, 1);
      fileName.value.splice(index, 1);
      fileSize.value.splice(index, 1);
      toast.add({severity:'warn', summary: 'File Removed', detail:'Your file has been removed.', life: 3000});
    };

    const getFileSize = (index) => {
      return (fileSize.value[index] / 1024 / 1024).toFixed(2) + ' MB'; // Convert bytes to MB
    };

    const onFileChange = (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      Array.from(files).forEach(file => {
        fileName.value.push(file.name);
        fileSize.value.push(file.size);
        const reader = new FileReader();
        reader.onload = (e) => {
          fileDataUrl.value.push(e.target.result);
        };
        reader.readAsDataURL(file);
        fileObjects.value.push(file); // Store the File object
      });
      toast.add({ severity: 'success', summary: 'File Added', detail: 'Your file has been added successfully.', life: 3000 });
    };

    console.log('orgName:', orgName.value); // Log the value of orgName to the console

    const submitForm = () => {
      if (!orgName.value || !contactName.value || !phoneNum.value || !startDate.value || !postTitle.value || !postDesc.value || !programType.value || !email.value || !season.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly.', life: 3000 });
      } else {
        const formData = new FormData();
        let files = []; // Create an array to store file names
        fileObjects.value.forEach((file, index) => {
          formData.append('file', file, fileName.value[index]); // Append the File object
          files.push(fileName.value[index]); // Add the file name to the array
        });

        axios.post('https://ictdatabasefileupload.azurewebsites.net/api/ICTFileUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            // Handle success
            console.log(response);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully.', life: 3000 });

            // Generate a random 6 digit number for the PostID
            const postID = Math.floor(100000 + Math.random() * 900000);

            // Automatically set the status to "Open" when the form is submitted
            const status = 'Open';

            // Log the value of orgName
            console.log('orgName:', orgName.value);

            // Get the current date and time
            const dateAdded = new Date().toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          });

            // Send another POST request to the Azure Function URL
            const postData = {
              orgName: orgName.value,
              contactName: contactName.value,
              phoneNum: phoneNum.value,
              startDate: startDate.value,
              postID: postID,
              postTitle: postTitle.value,
              postDesc: postDesc.value,
              programType: programType.value,
              postType: programType.value,
              files: files.join(','), // Send the file names as a comma-separated string
              status: status,
              email: email.value,
              season: season.value,
              dateAdded: dateAdded,
            };

            // Print the POST data to the console
            console.log(JSON.stringify(postData));

            return axios.post('https://ictdatabasefileupload.azurewebsites.net/api/postToICTSQLDatabasePostings', postData, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
          })
          .then(response => {
            // Handle success of the second POST request
            console.log(response);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Data inserted successfully.', life: 3000 });
            clearForm(); // Clear the form
          })
          .catch(error => {
            // Handle error
            console.log(error);
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit the form.', life: 3000 });
          });
      }
    };

    return {
      fileName,
      fileDataUrl,
      fileSize,
      fileObjects,
      goBack,
      onDragOver,
      onDrop,
      onFileChange,
      getPreviewImage,
      removeFile,
      getFileSize,
      submitForm,
      orgName,
      contactName,
      phoneNum,
      startDate,
      postID,
      postTitle,
      postDesc,
      programType,
      postType,
      files,
      status,
      email,
      season,
      dateAdded,
      toast
    };
  
    }
  }


</script>
 
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.Postings {
  z-index: 10001;
  border: 1px solid black;
  position: fixed;
  background-color: rgb(255, 255, 255);
  padding: 40px;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  width: 100%; /* Set the width of the form */
  max-width: 800px; /* Set the maximum width of the form */
}
.org-contact-container, .contact-info-container {
  display: flex;
  justify-content: center;
  gap: 20px; 
  padding-bottom: 20px;
}
.orgName {
  margin-left: -5px;
  transform: translateX(10px);
}
.email {
  transform: translateX(px);
}
.email input {
  margin-left: 95px;
  transform: translateX(22px);
}
.phoneNumber {
  transform: translateX(12px);
}
.contactName input {
  transform: translateX(5px);
}
.posting {
  margin-left: -380px;
  padding-bottom: 20px;
  transform: translateX(-8px);
}
.posting select {
  transform: translateX(32px);
}
.startDate {
  display: flex;
  flex-direction: row; 
  align-items: center; 
  transform: translateX(22px);
}
 
.start-date-container {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
 
.startDate label {
  margin-right: 10px; 
  transform: translateX(10px);
}
.date-inputs {
  display: flex;
  gap: 10px; 
  transform: translateX(83px);
}
.Title {
  transform: translateX(-67px);
  padding-bottom: 20px;
}
.Title input {
  transform: translateX(127px);
  width: 480px;
}
.Description {
  transform: translateX(-38px);
  padding-bottom: 20px;
}
.Description input {
  transform: translateX(68px);
  width: 480px;
  padding-bottom: 80px;
}
.FileUpload {
  transform: translateX(-150px);
  padding-bottom: 20px;
} 
.FileUpload input {
  transform: translateX(63px);
  cursor: pointer; 
}
.center-text {
  width: 100%;
  text-align: center;
}
.remove-instruction {
color: #732181;
font-size: 12px;
text-align: center;
align-self: center;
transform: translateY(-15px);
}
.drag-drop-box {
border: 2px dashed #732181;
padding: 20px;
margin-top: 10px;
text-align: center;
cursor: pointer;
color: black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
}
.drag-drop-box:hover {
color: #732181; 
}

.FileUpload {
transform: translateX(5px);
padding-bottom: 20px;
}
.preview-image {
width: 50px;
height: 50px;
}
.file-info {
display: flex;
flex-direction: row;
align-items: left;
gap: 10px;
}
.submit button {
  background-color: #732181; 
  color: white;
  border: 2px solid black; 
  padding: 8px 20px; 
  cursor: pointer; 
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.close-button:hover {
  color: white;
  background-color: red;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4; 
}
</style>