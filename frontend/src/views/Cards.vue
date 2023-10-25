<template>
    <div class="user-card">
        <div class="card-info">
            <img :src="user.avatar_url" :alt="user.name" />
            <h3>Nome: {{ user.name }}</h3>
            <p>User: {{ user.username }}</p>
        </div>

        <div class="buttons">
            <div>
                <a :href="user.html_url" target="_blank"><img src="../assets/components/icons/github.svg" class="icons"></a>
            </div>
            <div @click="deleteUser">
                <img src="../assets/components/icons/trash.svg" class="icons">
            </div>
            <div @click="favoriteUser">
                <img src="../assets/components/icons/star.svg" class="icons" v-if="!user.favorite">
                <img src="../assets/components/icons/star-filled.svg" class="icons" v-if="user.favorite">
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    props: {
        user: {
            type: Object,
            required: true
        },
    },
    methods: {
        async deleteUser() {
            await axios.delete(`http://localhost:3000/users/${this.user.username}`)
            window.location.reload()
        },
        async favoriteUser() {
            await axios.patch(`http://localhost:3000/users/${this.user.username}`)
            window.location.reload()
        },
    }
}
</script>
  
<style scoped>
.user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color:#7C27F2;
    width: 25%;

}

.card-info {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #F2F2F2
}

.card-info img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: solid #f2f2f2
}

.card-info h3 {
    margin-top: 10px;
}

.card-info p {
    margin-bottom: 10px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding-bottom: 10px;
}

.buttons button {
    inline-size: auto;
    height: 30px;
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif, bold 700;
    cursor: pointer;
    background: #5A5D9D;
    border: none;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 5px;
}

#profile-button button {
    background: #5A5D9D;
}

#profile-button button:hover {
    background: #fff;
    color: #454545;
}

#delete-button {
    background: #B75D69;
}

#delete-button:hover {
    background: #fff;
    color: #B75D69;
}

#favorite-button {
    background: #EAC435;
}

#favorite-button:hover {
    color: #FFE569;
    background: #fff;
}

.favorite-user {
    background-color: #EAC435;
}

.icons {
    width: 40px;
}
</style>
  