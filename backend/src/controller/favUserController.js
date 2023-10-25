const { Request, Response } = require("express");
const db = require("../database/db");

//função de registro de um usuario no banco
const registerUser = (request, response) => {
  const { users } = db.readAllUsers();
  console.log(users);
  const data = request.body;
  console.log(data);
  if (users.length == 5) {
    return response.status(400).json({
      error: `Limite máximo atingido, remova algum usuário para possibilitar o registro`,
    });
  }


  let existentUser = false;

  if (users.length != 0) {
    users.forEach((element) => {
      if (element.id === data.id) {
        existentUser = true;

        return response.status(400).json({
          error: `O usuário: ${data.username} já está cadastrado`,
        });
      }
    });
  }

  if (existentUser == false) {
    db.insertUser({ ...data, favorite: false });

    return response.status(201).json("registerUser");
  }
};

//função de leitura dos usuarios cadastrados no banco
const index = (request, response) => {
  const users = db.readAllUsers();
  console.log(users);
  return response.status(200).json(users);
};

//função de remover usuario do banco
const deleteUser = (request, response) => {
  const username = request.params.username;

  const { users } = db.readAllUsers();

  users.forEach((user, index) => {
    if (user.username == username) {
      db.deleteUser(index);

      return response.status(200).json({
        msg: `Usuário ${username} deletado com sucesso`,
      });
    }
  });

  return response.status(400).json({
    error: `Usuário: ${username} não encontrado`,
  });
};

//função de favoritar usuário
const favoriteUser = (request, response) => {
  const { users } = db.readAllUsers();
  const data = request.params.username;
  users.forEach((user) => {
    if (user.username == data) {
      user.favorite = !user.favorite;
    } else user.favorite = false;
  });
  return response.status(200).json({
    msg: `Usuário ${data} favoritado com sucesso`,
  });
};

module.exports = {
  index,
  registerUser,
  deleteUser,
  favoriteUser,
};
