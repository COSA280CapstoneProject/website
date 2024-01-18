<template>
    <div class="popup">
      <h2>Stats Popup Title</h2>
      <p>Stats Popup content...</p>
      <button @click="closePopup">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closePopup() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    z-index: 1000;
  }
  </style>