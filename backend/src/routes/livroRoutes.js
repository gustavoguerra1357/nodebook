// src/routes/livros.js
const express = require('express')
const router = express.Router()

const livroController = require("../controllers/livroController")

router.get('/livros', livroController.listarTodos) //GET - listar livros
router.get('/livros/:id', livroController.buscarPorId) //GET - buscar por id
router.post('/livros', livroController.criar) //POST - cadastrar livro

router.put('/livros/:id', livroController.atualizar) //PUT - ATUALIZAR
router.post('/livros/:id', livroController.deletar) //POST - DELETAR



module.exports = router