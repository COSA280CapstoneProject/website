<template>
  <div class="dropdown" v-bind:class="{ 'dropdown-show': show }">
    <div class="dropdown-header">Export Menu</div> 
    <button class="dropdown-option">Export all</button>
    <button class="dropdown-option">Export open</button>
    <button class="dropdown-option">Export filled</button>
    <button class="dropdown-option">Export by date</button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 53px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out, border 0.2s ease-out, opacity 0.2s ease-out;
  border: black solid 2px;
  opacity: 0;
}

.dropdown-show {
  max-height: 500px;
  opacity: 1;
}

.dropdown-option {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: left;

}

.dropdown-header {
  padding: 12px 16px;
  background-color: #f9f9f9;
  font-weight: bold;
}
</style>