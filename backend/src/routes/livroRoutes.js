// src/routes/livros.js
const express = require('express')
const livroRouter = express.Router()

const livroController = require("../controllers/livroController")

livroRouter.get('/livros', livroController.listarTodos) //GET - listar livros 
livroRouter.get('/livros/:id', livroController.buscarPorId) //GET - buscar por id
livroRouter.post('/livros', livroController.criar) //POST - cadastrar livro

livroRouter.put('/livros/:id', livroController.atualizar) //PUT - ATUALIZAR
livroRouter.delete('/livros/:id', livroController.deletar) //DELETE - DELETAR



module.exports = livroRouter