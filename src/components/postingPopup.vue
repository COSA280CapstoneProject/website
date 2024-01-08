<template>
    <div>
      <h1>Create Posting</h1>
      <div class="input-group">
        <div class="orgName">
          <div>
            <label for="orgName">Organization Name </label>
            <input type="text" id="orgName" name="orgName">
          </div>
          </div>
          <div class="contactName">
            <label for="contactName">Contact Name </label>
            <input type="text" id="contactName" name="contactName">
          </div>
        </div>
        <div class="email">
          <div>
            <label for="email">Email </label>
            <input type="text" id="email" name="email">
          </div>
          <div class="phoneNumber">
            <label for="phoneNumber">Phone Number:</label>
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
        <div>
            <label for="startDate">Start Date:</label>
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
  </template>
  
  <script></script>
  
  <style>
  </style>