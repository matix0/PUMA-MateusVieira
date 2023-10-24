const { Router } = require('express')
const favUserController = require('./controller/favUserController')
const routes = Router()

//lembrar de atualizar rota para os favoritos quando implementar
routes.get('/users/', favUserController.index)
routes.post('/users/', favUserController.registerUser)
routes.delete('/users/:username', favUserController.deleteUser)

module.exports = routes