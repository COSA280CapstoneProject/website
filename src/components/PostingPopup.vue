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
                <input type="text" v-model="orgName" :class="{ error: submitted && !orgName.trim() }" />
              </div>
              <div class="contactName">
                <label for="contactName">Contact Name </label>
                <input type="text" v-model="contactName" :class="{ error: submitted && !contactName }" />
              </div>
            </div>
            <div class="contact-info-container">
              <div class="contact-info-container">
                <div class="email">
                  <label for="email">Email </label>
                  <div>
                    <input type="text" v-model="email" @input="validateEmail" :class="{ error: submitted && (!emailIsValid || !email) }" />
                    <span v-if="submitted && (!emailIsValid || (!email && !emailIsValid)) " class="error-message">Please enter a valid email address.</span>
                  </div>
                </div>
              </div>
              <div class="phoneNumber">
                <label for="phoneNumber">Phone Number </label>
                <input type="text" id="phoneNum" name="phoneNum" @input="updatePhoneNumber"
                  :value="formattedPhoneNumber" :class="{ error: submitted && !formattedPhoneNumber }" />
              </div>
            </div>
            <div class="posting">
              <label>Type of</label>
              <div class="posting-label">
                <label for="postingType">Posting</label>
              </div>
              <div class="select-container">
                <select id="postingType" name="postingType" v-model="programType"
                  :class="{ error: submitted && !programType }">
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
                  <select id="Year" name="Year" v-model="startDate" :class="{ error: submitted && !startDate }">
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                  </select>
                  <select id="Season" name="Season" v-model="season" :class="{ error: submitted && !season }">
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="Title">
              <label for="Title" id="TitleL">Title </label>
              <input type="text" id="Title" name="Title" v-model="postTitle"
                :class="{ error: submitted && !postTitle }" />
            </div>
            <div class="Description">
              <label for="Description">Description </label>
              <textarea id="Description" name="Description" v-model="postDesc" :class="{ error: submitted && !postDesc }"></textarea>
            </div>
            <div class="FileUpload">
              <div class="drag-drop-box" @dragover.prevent="onDragOver" @drop.prevent="onDrop"
                @click="$refs.fileUpload.click()">
                <p class="remove-instruction" v-if="fileDataUrl.length">Tap on the icon to remove file from box</p>
                <div class="center-text" v-if="!fileDataUrl.length">Drag & Drop Image Here or Choose</div>
                <div class="file-info" v-for="(url, index) in fileDataUrl" :key="index">
                  <img :src="getPreviewImage(index)" class="preview-image" :title="fileName[index]"
                    @click="removeFile(index, $event)" />
                  <p>{{ fileName[index] }} ({{ getFileSize(index) }})</p>
                </div>
              </div>
              <input type="file" id="fileUpload" name="fileUpload" ref="fileUpload" @change="onFileChange"
                style="display: none" multiple :class="{ error: submitted && !fileDataUrl.length }" />
              <!-- eslint-disable-next-line -->
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
    Toast 
  },
  data() {
    return {
      isPopupActive: false
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
    const years = ref([]);

     const isValidEmail = (emailValue) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(emailValue);
    };

    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      for (let i = 0; i < 4; i++) {
        years.value.push(currentYear + i);
      }
    };

    generateYears();

    const validateEmail = () => {
      console.log('Email:', email.value);
      if (!email.value) {
        emailIsValid.value = false;
      } else {
        emailIsValid.value = isValidEmail(email.value);
      }
      console.log('Email is valid:', emailIsValid.value);
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
      return (fileSize.value[index] / 1024 / 1024).toFixed(2) + ' MB'; 
    };

    const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;

  Array.from(files).forEach(file => {
    if (file.size > 15 * 1024 * 1024) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'File size exceeds the maximum limit of 15MB.', life: 3000 });
      return;
    }

    fileName.value.push(file.name);
    fileSize.value.push(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      fileDataUrl.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
    fileObjects.value.push(file);
  });

  toast.add({ severity: 'success', summary: 'File Added', detail: 'Your file has been added successfully.', life: 3000 });
};

    console.log('orgName:', orgName.value); 

    const submitForm = () => {
      submitted.value = true;

      validateEmail(); // Validate the email

      if (!orgName.value || !contactName.value || !phoneNum.value || !startDate.value || !postTitle.value || !postDesc.value || !programType.value || !email.value || !season.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please make sure the field is filled out correctly.', life: 3000 });
        return;
      }

      if (!isValidEmail(email.value)) {
        emailIsValid.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a valid email address.', life: 3000 });
        return;
      } else {
        emailIsValid.value = true;
      }

      const formData = new FormData();
      const filesToUpload = [];

      fileObjects.value.forEach((file, index) => {
        formData.append('file', file, fileName.value[index]);
        filesToUpload.push(fileName.value[index]);
      });

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
            blobUrl: ''
    };

    const uploadFiles = () => {
        const promises = fileObjects.value.map((file, index) => {
          const formData = new FormData();
          formData.append('file', file, fileName.value[index]);

          return axios.post('https://ictdatabasefileupload.azurewebsites.net/api/ICTFileUpload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log(response);
              toast.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully.', life: 3000 });

              const urlRegex = /(https?:\/\/[^\s]+)/g;
              return response.data.match(urlRegex)[0]; // Return the URL from the response data
            })
            .catch(error => {
              console.error(error);
              toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload the file.', life: 3000 });
            });
        });

        return Promise.all(promises)
          .then(urls => {
            postData.blobUrl = urls.join(','); // Join the URLs into a string and update blobUrl
          });
      };

    const insertData = () => {
          return axios.post('https://ictdatabasefileupload.azurewebsites.net/api/postToICTSQLDatabasePostings', postData, {
            headers: {
              'Content-Type': 'application/json'
            }
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

    if (fileObjects.value.length > 0) {
      uploadFiles().then(insertData);
    } else {
      insertData();
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
    formattedPhoneNumber,
    updatePhoneNumber,
    isValidEmail,
    validateEmail,
    toast,
    submitted,
    years,
    emailIsValid
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
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
 
.org-contact-container, .contact-info-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  align-items: flex-start;
  justify-content: space-between; 
  margin-bottom: -10px;
  width: 45.6%;
}

.email div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
 
.phoneNumber {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13%;
  width: 45%;
  margin-top: -1%;
}

.phoneNumber input {
  transform: translateX(-1%);
}
 
.orgName label, .contactName label, .email label, .phoneNumber label {
  margin-right: 5px;
  font-size: 16px;
}

.orgName label {
  text-align: left;
}

.contactName label, .phoneNumber label{
  text-align: left;
}

.orgName input, .contactName input, .email input, .phoneNumber input {
  padding: 5px;
  margin: 0;
  font-size: 16px;
}


.Description textarea {
  resize: none; 
}
.email input {
  padding: 5px;
  margin: 0;
  margin-left: 72px;
  font-size: 16px;
}
 
.Description input {
  height: 120px;
  padding: 5px;
  margin: 0;
  font-size: 16px;
}
 
.posting {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-top: -15px;
}

.posting .select-container {
  display: flex;
  align-items: center; 
}

.posting-label {
  margin-top: 5px;
}

.posting label {
  margin-right: 5px;
}

.select-container {
  margin-left: 112px;
  margin-top: -20px;
  flex: 1; 
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

.error-message {
  height: 20px;
  color: red;
  font-size: 10px;
  width: 123%;
  position: absolute;
  margin-left: -40%;
  transform: translateY(155%);
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
  padding-bottom: 20px;
}
 
.Title label, .Description label {
  margin-right: 5px;
}

.Title {
  padding-bottom: 20px;
}
.Title input, .Description input {
  width: 605px;
  height: 25px;
  font-size: 16px;
  font-family: Gotham;
  font-weight: normal;
}

.Description textarea {
  width: 605px;
  height: 120px;
  padding: 5px;
  margin: 0;
  font-size: 16px;
}
.Description label {
  margin-bottom: 5px;
  margin-top: -14%;
}
.Title input {
  
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
 
.drag-drop-container {
  position: relative; /* Ensure relative positioning for containing the box and files */
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
  min-height: 100px; /* Set a minimum height to prevent collapsing */
  position: relative; /* Ensure relative positioning */
}

.drag-drop-box:hover {
  color: #732181; 
}

.remove-instruction {
  color: #732181;
  font-size: 12px;
  text-align: center;
  align-self: center;
  position: absolute;
  padding-bottom: 15%; 
  top: 1%;
  left: 50%;
  transform: translateX(-50%);
}

.file-info {
  display: flex;
  flex-direction: row;
  align-items: left;
  gap: 10px;
  margin-top: 10px; 
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
  padding: 10px 32px; 
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
 
#TitleL {
  margin-right: 65px;
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
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid red;
  border-right: 1px solid red;
  display: block;
}

@media only screen and (max-width: 600px) {
  .Postings {
    width: 100vw; /* Make popup width equal to viewport width */
    height: 100vh; /* Make popup height equal to viewport height */
    padding: 20px; /* Adjust padding as needed */
    box-sizing: border-box; /* Include padding in the total width and height */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/background 2.jpg'); /* Background image */
    background-size: cover; /* Adjust background size as needed */
    background-position: center; /* Adjust background position as needed */
    background-repeat: no-repeat; /* Adjust background repeat as needed */
    padding: 40px; /* Adjust padding as needed */
  }

  .org-contact-container,
  .contact-info-container {
    flex-direction: column;
    width: 100%;
    margin-top: 5px; /* Adjust spacing between containers */
  }

  .orgName,
  .contactName,
  .email,
  .phoneNumber {
    width: 100%;
  }

  .orgName label,
  .contactName label,
  .email label,
  .phoneNumber label {
    margin-right: 0;
    text-align: left;
    width: 50%;
    font-size: 14px;
    margin-bottom: 5px; /* Add margin-bottom for spacing */
  }

  .email {
  display: flex;
  flex-direction: row; /* Ensure inline display for label and input */
  align-items: center; /* Align items vertically */
  justify-content: space-between; /* Align items with space between */
  width: 100%;
}

.email input {
  width: 117%; /* Adjust width as needed */
  font-size: 14px;
  margin-top: -5px; /* Adjust the margin-top to align input box with label */
  margin-left: -49%;
  transform: translateX(27%);
}

  .posting,
  .startDate,
  .Title,
  .Description {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 10px; /* Adjust spacing between sections */
  }

  .Description label{
    padding-top: 10%;
  }
  .Title input,
  .Description textarea {
    width: 100%;
    font-size: 14px;
  }

  .select-container {
    margin-top: -8%;
    width: 100%;
  }

  .submit button {
    padding: 12px 24px;
  }

  .close-button {
    top: 5px;
    right: 5px;
    font-size: 16px;
  }

  .remove-instruction {
    padding-bottom: 10%;
  }
}
.TitleL {
  margin-right: 5px;
}


</style>