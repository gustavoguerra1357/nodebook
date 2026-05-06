const express = require('express')
const usuarioRoutes = express.Router()

const usuarioController = require("../controllers/usuarioController")


usuarioRoutes.get('/usuarios', usuarioController.listarTodos) //GET - Listar todos os usuarios
usuarioRoutes.get('/usuarios/:id', usuarioController.buscarPorId) //GET - Buscar usuario por ID
usuarioRoutes.post('/usuarios', usuarioController.criar) //POST - Criar usuario
usuarioRoutes.put('/usuarios/:id', usuarioController.atualizar) //PUT - Atualizar usuario
usuarioRoutes.delete('/usuarios/:id', usuarioController.deletar) //DELETE - Deletar usuario

module.exports = usuarioRoutes