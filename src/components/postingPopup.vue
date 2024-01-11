<template>
  <div>
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
        <label for="fileUpload">Upload File: </label>
        <input type="file" id="fileUpload" name="fileUpload">
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
.org-contact-container, .contact-info-container {
  display: flex;
  justify-content: center;
  gap: 20px; 
  padding-bottom: 20px;
}
.email {
  transform: translateX(3px);
}
.email input {
  margin-left: 95px;
}
.phoneNumber {
  transform: translateX(3px);
}
.contactName input {
  transform: translateX(4px);
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
  transform: translateX(639px);
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
</style>