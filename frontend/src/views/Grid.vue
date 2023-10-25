<template>
    <div @click="sortUsers()" class="sort">
        <img src="../assets/components/icons/sort.svg" class="icons">
    </div>
    <div class="grid">
        <div v-if="users.length > 0" class="grid">
            <UserCard v-for="user in users" :key="user.id" :user="user" @delete="deleteUser(user)"
                @favorite="favoriteUser(user)" />
        </div>
        <p v-else>Adicione algum usuário para preencher o grid :)</p>
    </div>
</template>
  
<script>
import axios from 'axios';
import UserCard from './Cards.vue';

export default {
    components: {
        UserCard
    },
    data() {
        return {
            users: [],
        };
    },
    created() {
        axios.get('http://localhost:3000/users/')
            .then(response => {
                this.users = response.data.users;
                this.users.favorite = response.data.users.favorite;
            })
            .catch(error => {
                console.error('Não foi possível consultar a lista de usuários', error);
            });
    },
    methods: {
        sortUsers() {
            console.log("clicou");
            this.users.sort((a, b) => {
                if (a === null) {
                    return
                }
                if (b === null) {
                    return -1
                }
                if (a === b) {
                    return 0
                }
                return a.name?.localeCompare(b.name)
            });
        }
    }
}
</script>
  
<style scoped>
button {
    margin-left: 20px;
    margin-top: 20px;
}

img {
    width: 30px;
}

.grid {
    display: flex;
    gap: 30px;
    justify-content: center;
    background-color: #1A1423;
    border-radius: 5px;
    padding-bottom: 40px;
    padding-top: 20px;
    height: 100%;
}

p {
    margin-top: 10px;
    text-align: center;
}

.sort{
    margin-bottom: -40px;
    
}
</style>
  