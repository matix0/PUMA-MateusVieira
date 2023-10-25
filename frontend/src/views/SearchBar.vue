<template>
    <div class="search-bar">
        <h1>PUMA - DESAFIO LISTA DE FAVORITOS</h1>
        <p>Insira abaixo o username do usuário no GitHub</p>
        <div class="search-field">
            <input type="text" v-model="searchQuery" placeholder="Username..." />
            <button id="search-button" @click="searchUserModal">Buscar</button>
        </div>
        <!-- Modal com o usuario (foto,nome,usuario)-->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2>Deseja inserir esse usuário?</h2>
                <div class="user-details">
                    <img :src="user.avatar_url" :alt="user.name" />
                    <div>
                        <h3>{{ user.name }}</h3>
                        <p>{{ user.username }}</p>
                    </div>
                </div>
                <div class="modal-buttons">
                    <button id="button-confirm" @click="confirmUser">Sim</button>
                    <button id="button-cancel" @click="closeModal">Não</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            showModal: false,
            user: null
        };
    },
    methods: {
        async searchUserModal() {
            try {
                const response = await axios.get(`https://api.github.com/users/${this.searchQuery}`);
                this.user = {
                    id: response.data.id,
                    name: response.data.name,
                    username: response.data.login,
                    avatar_url: response.data.avatar_url,
                    html_url: response.data.html_url,
                    favorite: false
                };
                this.showModal = true;
            } catch (error) {
                console.error('Erro ao buscar o usuário', error);
            }
        },
        async confirmUser() {
            axios.post('http://localhost:3000/users', this.user)
                .then(response => {
                    this.closeModal();
                    this.searchQuery = '';
                    window.location.reload()
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        this.closeModal();
                        alert(error.response.data.error);
                    } else {
                        console.error('Erro ao confirmar o usuário:', error);
                    }
                });
        },
        closeModal() {
            this.showModal = false;
            this.user = null;
        }
    }
}
</script>
  
<style scoped>
input {
    border-radius: 5px;
    height: 20px;
    width: 180px;
    border: solid #774C60;
    font-family: 'Open Sans', sans-serif;
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
    padding: 0px 0 20px 0px;
    background-color: darkolivegreen;
    border-radius: 5px;
}

.search-field {
    display: flex;
    justify-content: center;
    gap: 20px;
    background-color: #774C60;
}

#search-button {
    padding: 0 2rem;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 10px;
}

#search-button:hover {
    background: #fff;
    color: #774C60;
}

.modal{
    display: flex;
    background-color: cornflowerblue;
    color: black;
    justify-content: center;
}

h1{
    margin: 0;
}
</style>





        


