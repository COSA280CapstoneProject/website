<template>
  <div class="dropdown" v-bind:class="{ 'dropdown-show': show }">
    <PanelMenu :model="items" class="dropdown-option"></PanelMenu>
    <div v-if="showDateExport" class="date-export-dropdown">
      <h4>Start date</h4>
      <Calendar v-model="startDate" showIcon />
      <h4>End date</h4>
      <Calendar v-model="endDate" showIcon />
      <button @click="exportData">Export</button>
    </div>
  </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import 'primevue/resources/themes/saga-blue/theme.css'; // theme
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
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
      items: [
        {
          label: 'Export all',
          icon: 'pi pi-fw pi-file',
        },
        {
          label: 'Export open',
          icon: 'pi pi-fw pi-file',
        },
        {
          label: 'Export filled',
          icon: 'pi pi-fw pi-file',
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
    async exportData() {
      const filteredData = await this.fetchAndFilterData();
      this.downloadCSV(filteredData);
    },
    async fetchAndFilterData() {
      const response = await fetch('https://ictdatabaseapi.azurewebsites.net/api/queryICTSQLDatabasePostings');
      const data = await response.json();
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return data.filter(item => {
        const itemDate = new Date(item.StartDate);
        return itemDate >= startDate && itemDate <= endDate;
      });
    },
    downloadCSV(data) {
      const csvContent = 'data:text/csv;charset=utf-8,' + 
                        data.map(row => Object.values(row).join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'exported_data.csv');
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
  background-color: #f9f9f9;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
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