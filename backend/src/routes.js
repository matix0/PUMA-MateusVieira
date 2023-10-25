const { Router } = require('express')
const favUserController = require('./controller/favUserController')
const routes = Router()

routes.get('/users/', favUserController.index)
routes.post('/users/', favUserController.registerUser)
routes.delete('/users/:username', favUserController.deleteUser)
routes.patch('/users/:username', favUserController.favoriteUser)

module.exports = routes