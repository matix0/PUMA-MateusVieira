const { Request, Response } = require("express");
const db = require("../database/db");


//create -> read -> delete -> star
//falta realizar os favoritos

//registro de um usuario no banco
const registerUser = (request, response) => {
  const { users } = db.readAllUsers();
  const data = request.body;
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
    db.insertUser(data);

    return response.status(201).json("registerUserd");
  }
};

//leitura dos usuarios cadastrados no banco
const index = (request, response) => {
  const users = db.readAllUsers();
  console.log(users);
  return response.status(200).json(users);
};

//remover usuario do banco
const deleteUser = (request, response) => {
  const username = request.params.username;

  const { users } = db.readAllUsers();

  users.forEach((user, index) => {
    if (user.username == username) {
      db.deleteOne(index);

      return response.status(200).json({
        msg: `Usuário ${username} deletado com sucesso`,
      });
    }
  });

  return response.status(400).json({
    error: `Usuário: ${username} não encontrado`,
  });
};

module.exports = {
  index,
  registerUser,
  deleteUser,
};
