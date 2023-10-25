<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <div class="app">
    <SearchBar @add-user="addUser" />
    <Grid @delete="deleteUser" />
  </div>
</template>

<script>
import { ref } from "vue";
import SearchBar from "./views/SearchBar.vue";
import Grid from "./views/Grid.vue";

export default {
  components: {
    SearchBar,
    Grid,
  },
};
</script>

<style scoped>
.app {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #3b1473;
  font-family: 'Montserrat', sans-serif;
}
</style>
