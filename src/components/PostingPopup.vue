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
                <input type="text" v-model="orgName" :class="{ error: submitted && !orgName }" /> 
              </div>
              <div class="contactName">
                <label for="contactName">Contact Name </label>
                <input type="text" v-model="contactName" :class="{ error: submitted && !contactName }" /> 
              </div>
            </div>
            <div class="contact-info-container">
              <div class="email">
                <label for="email">Email </label>
                <input type="text" v-model="email" @input="validateEmail" :class="{ error: submitted && !emailIsValid }" />
                <span v-if="submitted && !emailIsValid" class="error-message">Please enter a valid email address.</span>
              </div>

              <div class="phoneNumber">
                <label for="phoneNumber">Phone Number </label>
                  <input type="text" id="phoneNum" name="phoneNum" @input="updatePhoneNumber" :value="formattedPhoneNumber" :class="{ error: submitted && !formattedPhoneNumber }" /> <!-- eslint-disable-next-line -->
              </div>
            </div>
          <div class="posting">
            <label for="postingType">Type of Posting</label>
            <div class="select-container">
              <select id="postingType" name="postingType" v-model="programType" :class="{ error: submitted && !programType }"> 
                <option value="Student Projects">Student Project</option>
                <option value="Internships">Internship</option>
                <option value="Job Placements">Job Placement</option>
              </select>
          </div>
        </div>
      <div class="startDate">
        <div class="start-date-container">
          <label for="startDate">Start Date </label>
          <div class="date-inputs">
            <select id="Year" name="Year" v-model="startDate" :class="{ error: submitted && !startDate }" > 
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
            <select id="Season" name="Season" v-model="season" :class="{ error: submitted && !season }" > 
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
        <input type="text" id="Title" name="Title" v-model="postTitle" :class="{ error: submitted && !postTitle }" /> 
      </div>
      <div class="Description">
        <label for="Description">Description </label>
        <input type="text" id="Description" name="Description" v-model="postDesc" :class="{ error: submitted && !postDesc }" /> 
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
        <input type="file" id="fileUpload" name="fileUpload" ref="fileUpload" @change="onFileChange" style="display: none" multiple :class="{ error: submitted && !fileDataUrl.length }" /> <!-- eslint-disable-next-line -->
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
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import Toast from 'primevue/toast';

export default {
  components: {
    Toast // Add Toast to the components object
  },
  data() {
    return {
      isPopupActive: false,
      submitted: false,
    };
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
    const submitted = ref(false);
    const emailIsValid = ref(true);

    const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validateEmail = () => {
    emailIsValid.value = isValidEmail(email.value);
  };

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

    const formattedPhoneNumber = computed(() => {
      return phoneNum.value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    });
    const updatePhoneNumber = (event) => {
      phoneNum.value = event.target.value.replace(/\D/g, '');
    };

    const getPreviewImage = (index) => {
      if (fileDataUrl.value[index].startsWith('data:image')) {
        return fileDataUrl.value[index];
      } else {
        return require('@/assets/file.png');
      }
    };

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
      toast.add({ severity: 'warn', summary: 'File Removed', detail: 'Your file has been removed.', life: 3000 });
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
  // Initial validation check for required fields
  if (!orgName.value || !contactName.value || !phoneNum.value || !startDate.value || !postTitle.value || !postDesc.value || !programType.value || !email.value || !season.value) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill out the form correctly.', life: 3000 });
    submitted.value = true;
    return;
  }

  // Validate email
  if (!isValidEmail(email.value)) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid email address.', life: 3000 });
    submitted.value = true;
    return;
  }

  // Set submitted to true (assuming you want to track the submission status)
  submitted.value = true;

  const formData = new FormData();
  const filesToUpload = [];

  fileObjects.value.forEach((file, index) => {
    formData.append('file', file, fileName.value[index]);
    filesToUpload.push(fileName.value[index]);
  });

  axios.post('https://ictdatabasefileupload.azurewebsites.net/api/ICTFileUpload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(response => {
    console.log(response);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully.', life: 3000 });

    const postID = Math.floor(100000 + Math.random() * 900000);
    const status = 'Open';
    const dateAdded = new Date().toLocaleString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

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
      files: filesToUpload.join(','),
      status: status,
      email: email.value,
      season: season.value,
      dateAdded: dateAdded,
    };

    console.log(JSON.stringify(postData));

    return axios.post('https://ictdatabasefileupload.azurewebsites.net/api/postToICTSQLDatabasePostings', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
  .then(response => {
    console.log(response);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data inserted successfully.', life: 3000 });
    clearForm();
  })
  .catch(error => {
    console.error(error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit the form.', life: 3000 });
  });
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
    formattedPhoneNumber,
    updatePhoneNumber,
    isValidEmail,
    validateEmail,
    toast
    };
  }
};
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
 
.org-contact-container, .contact-info-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 20px; 
  padding-bottom: 20px;
}
 
.orgName, .contactName {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 45%;
}
 
.email {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  width: 46.2%;
}
 
.phoneNumber {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 45%;
}
 
.orgName label, .contactName label, .email label, .phoneNumber label {
  margin-right: 5px;
  font-size: 16px; /* Set the same font size for all labels */
}
 
.orgName input, .contactName input, .email input, .phoneNumber input {
  padding: 5px; /* Set the same padding for all inputs */
  margin: 0; /* Set the same margin for all inputs */
  font-size: 16px; /* Set the same font size for all inputs */
}
 
.Description input {
  height: 120px;
  padding: 5px;
  margin: 0;
  font-size: 16px;
}
 
.posting {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  margin-left: -3px;
}

.posting .select-container {
  display: flex;
  margin-left: 20px;
}

.startDate {
  display: flex;
  flex-direction: row; 
  align-items: center; 
}
 
.start-date-container {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  gap: 16px;
}
 
.startDate label {
  margin-right: 10px; 
}
 
.date-inputs {
  display: flex;
  gap: 10px; 
}
 
.Title, .Description {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
 
.Title label, .Description label {
  margin-right: 5px;

}
.Title {
  padding-bottom: 20px;
}
.Title input, .Description input {
  width: 605px;
}
.Description label {
  margin-bottom: 5px;
  margin-top: -100px; /* Adjust this value as needed */
}
.Title input {
  margin-left: 60px
}
.FileUpload {
  padding-bottom: 20px;
} 
 
.FileUpload input {
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
.error {
  border: 4px solid red;
}
</style>