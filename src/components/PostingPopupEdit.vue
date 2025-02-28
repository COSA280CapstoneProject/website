<template>
  <div class="background" @click="goBack">
    <div v-if="isPopupActive" class="overlay"></div>
    <div v-bind:class="{ 'Postings': isPopupActive }">
      <div class="Postings" @click.stop>
        <div class="Postings">
          <Toast v-model="toast" position="top-right" />
          <h1>Edit Posting</h1>
          <div class="input-group">
            <div class="org-contact-container">
              <div class="orgName">
                <label for="orgName">Organization Name</label>
                <input type="text" v-model="detail.OrgName" :class="{ error: submitted && !detail.OrgName.trim() }" />
              </div>
              <div class="contactName">
                <label for="contactName">Contact Name </label>
                <input type="text" v-model="detail.ContactName" :class="{ error: submitted && !ContactName.trim() }" />
              </div>
            </div>
            <div class="contact-info-container">
              <div class="contact-info-container">
                <div class="email">
                  <label for="email">Email </label>
                  <div>
                    <input type="text" v-model="detail.Email" :class="{ error: submitted && !email }" />
                    <span v-if="submitted && !email" class="error-message">Please enter a valid email address.</span>
                  </div>
                </div>
              </div>
              <div class="phoneNumber">
                <label for="phoneNumber">Phone Number </label>
                <input type="text" id="phoneNum" name="phoneNum" @input="updatePhoneNumber" v-model.lazy="detail.PhoneNum" :class="{ error: submitted && !detail.PhoneNum }" />

              </div>
            </div>
            <div class="posting">
              <label>Type of</label>
              <div class="posting-label">
                <label for="postingType">Posting</label>
              </div>
              <div class="select-container">
                <select id="postingType" name="postingType" v-model="detail.PostType" :class="{ error: submitted && !detail.PostType }">
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
                  <select id="Year" name="Year" v-model="detail.StartDate" :class="{ error: submitted && !startDate }">
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                  <select id="Season" name="Season" v-model="detail.Season" :class="{ error: submitted && !season }">
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
              <input type="text" id="Title" name="Title" v-model="detail.PostTitle"
                :class="{ error: submitted && !postTitle }" />
            </div>
            <div class="Description">
              <label for="Description">Description </label>
              <textarea id="Description" name="Description" v-model="detail.PostDesc" :class="{ error: submitted && !detail.PostDesc }"></textarea>

            </div>
            <div class="submit">
              <button @click="submitForm">Edit</button>
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
  import { ref, onMounted } from 'vue';
  import { useToast } from 'primevue/usetoast';
  import axios from 'axios';
  import Toast from 'primevue/toast';
  import { reactive } from 'vue';
  
  export default {
    data() {
      return {
        years: [2024, 2025, 2026, 2027], // Years for the dropdown
        postingDetails: [],
      }
    },
    components: {
      Toast,
    },
    props: {
      editingPosting: Object,
      postID: {
        type: String,
        required: true,
      }
    },
    
    setup(props, { emit }) {
      const toast = useToast();
  
      // Initializing refs for form fields
      const OrgName = ref('');
      const ContactName = ref('');
      const PhoneNum = ref('');
      const StartDate = ref('');
      const PostTitle = ref('');
      const PostDesc = ref('');
      const ProgramType = ref('');
      const PostType = ref('');
      const Status = ref('');
      const Email = ref('');
      const Season = ref('');
  
      // Function to populate form fields from props
      onMounted(() => {
        const posting = props.editingPosting;
        OrgName.value = posting?.OrgName || '';
        ContactName.value = posting?.ContactName || '';
        PhoneNum.value = posting?.PhoneNum || '';
        StartDate.value = posting?.StartDate || '';
        PostTitle.value = posting?.PostTitle || '';
        PostDesc.value = posting?.PostDesc || '';
        ProgramType.value = posting?.ProgramType || '';
        PostType.value = posting?.PostType || '';
        Status.value = posting?.Status || '';
        Email.value = posting?.Email || '';
        Season.value = posting?.Season || '';
      });
      
      const detail = reactive({
      OrgName: '',
      ContactName: '',
      Email: '',
      PhoneNum: '', 
      PostType: '',
      ProgramType: '',
      StartDate: '',
      PostID: '',
      PostTitle: '',
      Season: '',
      DateAdded: '',
      PostDesc: '',
    });
    const fetchPostDetails = async () => {
  try {
    const response = await axios.get(`https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings?search=${props.postID}`);
    console.log(response.data);

    // Find the posting with the matching PostID
    const posting = response.data.find(item => item.PostID.toString() === props.postID);

    if (posting) {
      console.log("Posting found:", posting);
      // If a matching posting is found, assign its details to the detail object
      Object.assign(detail, {
        OrgName: posting.OrgName,
        ContactName: posting.ContactName,
        Email: posting.Email,
        PhoneNum: posting.PhoneNum,
        PostType: posting.PostType,
        ProgramType: posting.ProgramType,
        StartDate: posting.StartDate,
        PostID: posting.PostID,
        PostTitle: posting.PostTitle,
        Season: posting.Season,
        DateAdded: posting.DateAdded,
        Status: posting.Status,
        PostDesc: posting.PostDesc,
        // Add any other fields you need
      });
    } else {
      console.error("No posting found with the given PostID.");
      toast.add({ severity: 'error', summary: 'Fetch Failed', detail: 'No posting found with the given PostID.', life: 3000 });
    }
  } catch (error) {
    console.error("Failed to fetch posting details:", error);
    toast.add({ severity: 'error', summary: 'Fetch Failed', detail: 'Failed to fetch posting details.', life: 3000 });
  }
};

    onMounted(() => {
      fetchPostDetails();
    });

    
      // Define the endpoint map
      const endpointMap = {
        OrgName: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsOrgName',
        ContactName: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsContactName',
        PhoneNum: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsPhoneNum',
        PtartDate: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsStartDate',
        PostTitle: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsPostTitle',
        PostDesc: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsPostDesc',
        ProgramType: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsProgramtype',
        PostType: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsPostType',
        Email: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsEmail',
        Season: 'https://ictdatabasefileupload.azurewebsites.net/api/editICTSQLDatabasePostingsSeason',
      };

      // Function to clear all fields
      const clearFields = () => {
        OrgName.value = '';
        ContactName.value = '';
        PhoneNum.value = '';
        StartDate.value = '';
        PostTitle.value = '';
        PostDesc.value = '';
        ProgramType.value = '';
        PostType.value = '';
        Status.value = '';
        Email.value = '';
        Season.value = '';
      };
      
  
      // SubmitForm method to trigger update for changed fields
      const submitForm = async () => {
  // List of fields to check and update
  const fieldsToUpdate = [
    'OrgName', 'ContactName', 'PhoneNum', 'StartDate', 'PostTitle', 'PostDesc', 'ProgramType', 'PostType', 'Email', 'Season'
  ];
  console.log("Fields to update:", fieldsToUpdate);
  console.log("Detail:", detail);

  // Iterate over each field to check if it has changed
  for (const fieldName of fieldsToUpdate) {
    // Compare current value with the initial value from props
    if (props.editingPosting[fieldName] !== detail[fieldName] && detail[fieldName].trim() !== '') {
      // Update the field if it has changed
      await updateField(fieldName, detail[fieldName]);
    }
  }
        // Clear all fields after updating
        clearFields();
      };

      // Function to update a field, including postID in every request
      const updateField = async (fieldName, value) => {
        const payload = {
          postID: props.postID,
          [fieldName]: value,
        };

        try {
          await axios.post(endpointMap[fieldName], payload, {
            headers: { 'Content-Type': 'application/json' }
          });
          toast.add({ severity: 'success', summary: 'Update Successful', detail: `${fieldName} updated successfully.`, life: 3000 });
        } catch (error) {
          console.error(`Failed to update ${fieldName}:`, error);
          toast.add({ severity: 'error', summary: 'Update Failed', detail: `Failed to update ${fieldName}.`, life: 3000 });
        }
      };
  
      const goBack = () => emit('close');
  
      return {
        detail,
        goBack,
        submitForm,
        OrgName, ContactName, PhoneNum, StartDate, PostTitle, PostDesc, ProgramType, PostType, Status, Email, Season,
      };
    },
    
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
  margin-left: 66px;
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
  margin-right: 25px; 
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
  margin-right: 15px;
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