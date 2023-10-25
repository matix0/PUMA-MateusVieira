<template>
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
}
</style>
