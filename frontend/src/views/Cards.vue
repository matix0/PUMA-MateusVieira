<template>
  <div class="user-card">
    <div class="card-info">
      <img :src="user.avatar_url" :alt="user.name" />
      <h3>{{ user.name }}</h3>
      <p>{{ user.username }}</p>
    </div>

    <div class="buttons">
      <div>
        <a :href="user.html_url" target="_blank"
          ><img src="../assets/components/icons/github.svg" class="icons"
        /></a>
      </div>
      <div @click="deleteUser">
        <img src="../assets/components/icons/trash.svg" class="icons" />
      </div>
      <div @click="favoriteUser">
        <img
          src="../assets/components/icons/star.svg"
          class="icons"
          v-if="!user.favorite"
        />
        <img
          src="../assets/components/icons/star-filled.svg"
          class="icons"
          v-if="user.favorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteUser() {
      await axios.delete(`http://localhost:3000/users/${this.user.username}`);
      window.location.reload();
    },
    async favoriteUser() {
      await axios.patch(`http://localhost:3000/users/${this.user.username}`);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #7c27f2;
  width: 25%;
  min-width: fit-content;
  max-width: 260px;
  height: 260px;
}

.card-info {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #f2f2f2;
  font-weight: bold;
}

.card-info img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: solid #f2f2f2;
}

.card-info h3 {
  margin-top: 10px;
}

.card-info p {
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding-bottom: 10px;
  cursor: pointer;
}

#profile-button button {
  background: #5a5d9d;
}

#profile-button button:hover {
  background: #fff;
  color: #454545;
}

#delete-button {
  background: #b75d69;
}

#delete-button:hover {
  background: #fff;
  color: #b75d69;
}

#favorite-button {
  background: #eac435;
}

#favorite-button:hover {
  color: #ffe569;
  background: #fff;
}

.favorite-user {
  background-color: #eac435;
}

.icons {
  width: 40px;
}
</style>
