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
        <button type="submit" class="submit-button">Submit</button>
      </div>
      <div class="close-button">
        <button class="close-button" @click="goBack">X</button>
      </div>
    </div>
  </div>
</template>
   
<script>
export default {
  data() {
    return {
      fileName: [],
      fileDataUrl: [],
      fileSize: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      Array.from(files).forEach(file => {
        this.fileName.push(file.name);
        this.fileSize.push(file.size);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileDataUrl.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    getPreviewImage(index) {
      if (this.fileDataUrl[index].startsWith('data:image')) {
        return this.fileDataUrl[index];
      } else {
        return require('@/assets/file.png'); 
      }
    },
    removeFile(index, event) {
      event.stopPropagation(); // add this line
      this.fileDataUrl.splice(index, 1);
      this.fileName.splice(index, 1);
      this.fileSize.splice(index, 1);
    },
    getFileSize(index) {
      return (this.fileSize[index] / 1024 / 1024).toFixed(2) + ' MB'; // Convert bytes to MB
    }
  }
}
</script>
   
  <style>
  .Postings {
    z-index: 1000;
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