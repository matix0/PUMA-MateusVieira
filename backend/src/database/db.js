//persistir os dados como um objeto ou como json?
const db = {
  users: [],
};

const readAllUsers = () => {
  return db;
};

const insertUser = (data) => {
  db.users.push(data);
};

const deleteUser = (index) => {
  db.users.splice(index, 1);
};

const favoriteUser = (data) => {
  let favUser = data;
  users.favorite == favUser ? "" : users.favorite = favUser
};

module.exports = {
  readAllUsers,
  insertUser,
  deleteUser,
  favoriteUser
};