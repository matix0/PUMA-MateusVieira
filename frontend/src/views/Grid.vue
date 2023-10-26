<template>
  <div @click="sortUsers()" class="sort">
    <button>Ordenar Alfabeticamente</button>
  </div>
  <div v-if="users.length > 0" class="grid">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @delete="deleteUser(user)"
      @favorite="favoriteUser(user)"
    />
  </div>
  <p style="color: #f2f2f2" v-else>
    Adicione algum usuário para preencher o grid :)
  </p>
</template>

<script>
import axios from "axios";
import UserCard from "./Cards.vue";

export default {
  components: {
    UserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        this.users = response.data.users;
        this.users.favorite = response.data.users.favorite;
      })
      .catch((error) => {
        console.error("Não foi possível consultar a lista de usuários", error);
      });
  },
  methods: {
    sortUsers() {
      this.users.sort((a, b) => {
        if (a.name === null) {
          return 1; // move usuários com nome nulo para o final
        } else if (b.name === null) {
          return -1; // move usuários com nome nulo para o final
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    },
  },
};
</script>

<style scoped>
button {
  padding: 0 2rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 10px;
  margin-top: 20px;
}

button:hover {
  background: #fff;
  color: #774c60;
}

img {
  width: 30px;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: #3b1473;
  padding-bottom: 40px;
  padding-top: 20px;
  height: 100%;
  width: 100%;
  align-content: flex-start;
  justify-content: center;
}

p {
  margin-top: 10px;
  text-align: center;
}

.sort {
  display: flex;
  justify-content: center;
  background-color: #3b1473;
  padding: 10px 0px 20px 0px;
}
</style>
