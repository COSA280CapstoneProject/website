<template>
  <div class="hello">
    <posting-popup></posting-popup>
  </div>
</template>

<script>
import PostingPopup from './PostingPopup.vue';

export default {
  name: 'HelloWorld',
  components: {
    'posting-popup': PostingPopup
  }
}
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>