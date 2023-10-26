<template>
  <div class="search-bar">
    <h1>PUMA - DESAFIO LISTA DE FAVORITOS</h1>
    <p>Insira abaixo o username do usuário no GitHub</p>
    <div class="search-field">
      <input type="text" v-model="searchQuery" placeholder="Username..." />
      <button id="buttons" @click="searchUserModal">Buscar</button>
    </div>
    <!-- Modal com o usuario (foto,nome,usuario)-->
    <div v-if="showModal" class="modal">
      <div>
        <h2>Deseja inserir esse usuário?</h2>
        <div class="user-details">
          <img :src="user.avatar_url" :alt="user.name" />
          <div>
            <h3>{{ user.name }}</h3>
            <p>{{ user.username }}</p>
          </div>
        </div>
        <div class="modal-buttons">
          <button id="buttons" @click="confirmUser">Sim</button>
          <button id="buttons" @click="closeModal">Não</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      showModal: false,
      user: null,
    };
  },
  methods: {
    async searchUserModal() {
      if (this.searchQuery.length == 0) {
        alert("Não é possível pesquisar sem digitar um username !");
        return;
      }
      try {
        const response = await axios.get(
          `https://api.github.com/users/${this.searchQuery}`
        );
        this.user = {
          id: response.data.id,
          name: response.data.name,
          username: response.data.login,
          avatar_url: response.data.avatar_url,
          html_url: response.data.html_url,
          favorite: false,
        };
        this.showModal = true;
      } catch (error) {
        console.log(error);
        alert("Usuário Inexistente");
      }
    },
    async confirmUser() {
      axios
        .post("http://localhost:3000/users", this.user)
        .then((response) => {
          this.closeModal();
          this.searchQuery = "";
          window.location.reload();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.closeModal();
            alert(error.response.data.error);
          } else {
            console.error("Erro ao confirmar o usuário:", error);
          }
        });
    },
    closeModal() {
      this.showModal = false;
      this.user = null;
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 5px;
  height: 20px;
  width: 180px;
  border: solid #774c60;
  font-family: "Open Sans", sans-serif;
  text-align: center;
}

input:focus {
  outline: none;
}

input:hover {
  border: solid #454545;
}

.search-bar {
  text-align: center;
  gap: 20px;
  padding: 35px 0 20px 0px;
  background-color: #7c27f2e8;
  color: #e0e0e0;
}

.search-field {
  display: flex;
  justify-content: center;
  gap: 20px;
}

#buttons {
  padding: 0 2rem;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 10px;
}

#buttons:hover {
  background: #fff;
  color: #774c60;
}

.modal {
  display: flex;
  background-color: #7c27f200;
  color: #e0e0e0;
  justify-content: center;
}

.modal-buttons {
  display: flex;
  gap: 36px;
  justify-content: center;
}
.user-details img{
  width: 250px;
  height: 250px;
}
h1 {
  margin: 0;
}
</style>
