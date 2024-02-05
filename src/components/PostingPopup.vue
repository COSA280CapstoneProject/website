<template>
  <div class="Postings">
    <h1>Create Posting</h1>
    <div class="input-group">
      <div class="org-contact-container">
        <div class="orgName">
          <label for="orgName">Organization Name </label>
          <input type="text" id="orgName" name="orgName">
        </div>
        <div class="contactName">
          <label for="contactName">Contact Name </label>
          <input type="text" id="contactName" name="contactName">
        </div>
      </div>
      <div class="contact-info-container">
        <div class="email">
          <label for="email">Email </label>
          <input type="text" id="email" name="email">
        </div>
        <div class="phoneNumber">
          <label for="phoneNumber">Phone Number </label>
          <input type="text" id="phoneNumber" name="phoneNumber">
        </div>
      </div>
      <div class="posting type">
        <div>
          <label for="postingType">Type of Posting </label>
          <select id="postingType" name="postingType">
            <option value=""></option>
            <option value="">Student Projects</option>
            <option value="">Internships</option>
            <option value="">Job Placements</option>
          </select>
        </div>
      </div>
      <div class="startDate">
        <div class="start-date-container">
          <label for="startDate">Start Date </label>
          <div class="date-inputs">
            <select id="Year" name="Year">
              <option value=""></option>
              <option value="">2020</option>
              <option value="">2021</option>
              <option value="">2022</option>
              <option value="">2023</option>
              <option value="">2024</option>
              <option value="">2025</option>
              <option value="">2026</option>
              <option value="">2027</option>
              <option value="">2028</option>
              <option value="">2029</option>
              <option value="">2030</option>
            </select>
            <select id="Season" name="Season">
              <option value=""></option>
              <option value="">Fall</option>
              <option value="">Winter</option>
              <option value="">Spring</option>
              <option value="">Summer</option>
            </select>
          </div>
        </div>
      </div>
      <div class="Title">
        <label for="Title">Title </label>
        <input type="text" id="Title" name="Title">
      </div>
      <div class="Description">
        <label for="Description">Description </label>
        <input type="text" id="Description" name="Description">
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
</template>
 
<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

export default {
  setup() {
    const toast = useToast();
    const fileName = ref([]);
    const fileDataUrl = ref([]);
    const fileSize = ref([]);
    const fileObjects = ref([]);

    const goBack = () => {
      this.$router.go(-1);
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
      toast.add({ severity: 'success', summary: 'File Uploaded', detail: 'Your file has been uploaded successfully.', life: 3000 });
    };

    const submitForm = () => {
      if (!fileName.value || !fileDataUrl.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly.', life: 3000 });
      } else {
        const formData = new FormData();
        fileObjects.value.forEach((file, index) => {
          formData.append('file', file, fileName.value[index]); // Append the File object
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

            // Send another POST request to the Azure Function URL
            const postData = {
              OrgName: 'Your OrgName',
              ContactName: 'Your ContactName',
              PhoneNum: 'Your PhoneNum',
              StartDate: 'Your StartDate',
              PostID: 'Your PostID',
              PostTitle: 'Your PostTitle',
              PostDesc: 'Your PostDesc',
              ProgramType: 'Your ProgramType',
              PostType: 'Your PostType',
              Files: 'Your Files',
              Status: 'Your Status'
            };

            return axios.post('https://your-azure-function-url', postData);
          })
          .then(response => {
            // Handle success of the second POST request
            console.log(response);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Data inserted successfully.', life: 3000 });
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
      submitForm
    };
  
    }
  }


</script>
 
<style scoped>
.Postings {
  z-index: 10001;
  border: 1px solid black;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  padding: 40px;

}
.org-contact-container, .contact-info-container {
  display: flex;
  justify-content: center;
  gap: 20px; 
  padding-bottom: 20px;
}
.orgName {
  margin-left: -5px;
}
.email {
  transform: translateX();
}
.email input {
  margin-left: 95px;
}
.phoneNumber {
  transform: translateX();
}
.contactName input {
  transform: translateX();
}
.posting {
  margin-left: -390px;
  padding-bottom: 20px;
}
.posting select {
  transform: translateX(28px);
}
.startDate {
  display: flex;
  flex-direction: row; 
  align-items: center; 
  transform: translateX();
}
 
.start-date-container {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
 
.startDate label {
  margin-right: 10px; 
}
 
.date-inputs {
  display: flex;
  gap: 10px; 
  transform: translateX(60px);
}
.Title {
  transform: translateX(-55px);
  padding-bottom: 20px;
}
.Title input {
  transform: translateX(110px);
  width: 480px;
}
.Description {
  transform: translateX(-30px);
  padding-bottom: 20px;
}
.Description input {
  transform: translateX(60px);
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
.upload-button {
display: block;
width: 100%;
padding: 10px;
margin-top: 10px;
text-align: center;
background: #732181;
color: white;
cursor: pointer;
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
.submit-button {
  background-color: #732181; 
  color: white;
  border: 1px solid black; 
  padding: 10px 20px; 
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
</style>