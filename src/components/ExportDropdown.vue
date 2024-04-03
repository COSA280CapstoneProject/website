<template>
  <div class="dropdown" v-bind:class="{ 'dropdown-show': show }">
    <PanelMenu v-if="show" v-model="selectedItem" :model="items" class="dropdown-option"></PanelMenu>
    <div v-if="showDateExport" class="date-export-dropdown">
      <h4>Start date</h4>
      <Calendar v-model="startDate" showIcon />
      <h4>End date</h4>
      <Calendar v-model="endDate" showIcon />
      <button @click="exportDataByDate">Export</button>
    </div>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css'; 
import PanelMenu from 'primevue/panelmenu';

export default {
  components: {
    Calendar,
    PanelMenu
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      showDateExport: false,
      selectedItem: null,
      items: [
        {
          label: 'Export all',
          icon: 'pi pi-fw pi-file',
          command: () => { this.exportAllData(); }
        },
        {
          label: 'Export open',
          icon: 'pi pi-fw pi-file',
          command: () => { this.exportDataByStatus('Open'); }
        },
        {
          label: 'Export Closed',
          icon: 'pi pi-fw pi-file',
          command: () => { this.exportDataByStatus('Closed'); }
        },
        {
          label: 'Export by date',
          icon: 'pi pi-fw pi-calendar',
          command: () => { this.showDateExport = !this.showDateExport; },
        }
      ]
    };
  },
  methods: {
    async exportDataByDate() {
      const filteredData = await this.fetchAndFilterData();
      if (filteredData.length > 0) {
        this.downloadCSV(filteredData);
      } else {
        alert('No posting found for the dates selected. Please, select other dates.');
      }
    },
    async exportAllData() {
      const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings');
      const data = await response.json();
      this.downloadCSV(data);
    },
    async exportDataByStatus(status) {
  const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings');
  const data = await response.json();
  const filteredData = data.filter(item => item.Status === status);
  if (filteredData.length > 0) {
    this.downloadCSV(filteredData);
  } else {
    alert(`No ${status.toLowerCase()} posting found.`);
  }
},

    async fetchAndFilterData() {
      const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings');
      const data = await response.json();
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);

      // Adjusting user dates to match database date format (DD/MM/YYYY)
      const startDateFormatted = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
      const endDateFormatted = `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;

      // Filtering data based on the modified date format and the DateAdded column
      return data.filter(item => {
        // Parsing database date string to ensure accurate date comparison
        const itemDateParts = item.DateAdded.split('/');
        const itemDate = new Date(`${itemDateParts[1]}/${itemDateParts[0]}/${itemDateParts[2]}`);
        
        // Checking if the parsed date is valid
        if (isNaN(itemDate.getTime())) {
          console.error(`Invalid date format for item with DateAdded: ${item.DateAdded}`);
          return false;
        }

        // Adjusted date format for comparison
        const dbDateFormatted = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
        return dbDateFormatted >= startDateFormatted && dbDateFormatted <= endDateFormatted;
      });
    },
    downloadCSV(data) {
      // Extracting headers from the first row of data
      const headers = Object.keys(data[0]);
      
      // Creating CSV content with headers
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += headers.join(',') + '\n';

      // Adding data rows
      csvContent += data.map(row => Object.values(row).join(',')).join('\n');

      // Encoding URI, creating link, and triggering download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'exported_data.csv');
      document.body.appendChild(link);
      link.click();
    },
    handleClickOutside(event) {
      // Check if the click was inside the calendar
      const withinCalendar = event.composedPath().some(el => el.classList && el.classList.contains('p-datepicker'));
    

      // If the click was outside the dropdown and not within the calendar
      if (!this.$el.contains(event.target) && !withinCalendar) {
        this.closeDropdown();
      }
    },
    closeDropdown() {
      this.showDateExport = false;
      this.$emit('close-export'); // Emit an event to the parent component to close the dropdown
    },
  },
  mounted() {
    // Add a global click event listener when the component is mounted
    document.addEventListener('click', this.handleClickOutside, true);
  },
  beforeUnmount() {
    // Remove the global click event listener when the component is about to be destroyed
    document.removeEventListener('click', this.handleClickOutside, true);
  },
  
  
  // Extracting headers from the first row of data
  const headers = Object.keys(data[0]);
  
  // Creating CSV content with headers
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += headers.join('\t') + '\n';

  // Adding data rows
  csvContent += data.map(row => {
    // Loop through each cell in the row
    return headers.map(header => {
      let cellValue = row[header];
      // If the header is "PostDesc" and cellValue is not null or undefined
      if (header === 'PostDesc' && cellValue !== null && cellValue !== undefined) {
        cellValue = cellValue.replace(/\r?\n/g, ' ');
      }
      // Enclose all cell values in double quotes
      return `"${cellValue ? cellValue.replace(/"/g, '""') : ''}"`;
    }).join('\t');
  }).join('\n');

  // Get the current date to include in the file name
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0,10);

  // Constructing the file name with the current date
  const fileName = `ICTIndustryPostings${formattedDate}.csv`;

  // Encoding URI, creating link, and triggering download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}
  }
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  right: 0;
  top: 15%;
  background-color: #f9f9f9;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 999;
  margin-top: 50px;
  max-height: 0;
  
  transition: max-height 0.5s ease-out, border 0.2s ease-out, opacity 0.3s ease-out;
  border: black solid 1px;
  opacity: 0;
  padding: 0;
}

.dropdown-show {
  max-height: 500px;
  opacity: 1;
}

.dropdown-option {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;

}
.p-calendar {
  width: 90%;
  
  
}

.dropdown-header {
  padding: 12px 16px;
  background-color: #f9f9f9;
  font-weight: bold;
}

.date-export-dropdown button {
  background-color: #732181; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.date-export-dropdown button:hover {
  background-color: #5e116b;
}

.date-export-dropdown h4 {
  margin-top: 5px;
  margin-bottom: 5px;
}

::v-deep .date-export-dropdown .pi-calendar {
  background-color: #732181;

}
::v-deep .date-export-dropdown .p-button  {
  background-color: #732181;
  border: #732181;
}
</style>
