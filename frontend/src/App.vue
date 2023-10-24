<template>
  <div class="app">
    <SearchBar @add-user="addUser" />
  </div>
</template>

<script>
import { ref } from 'vue';
import SearchBar from './views/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },

}

</script>

<style scoped>
</style>