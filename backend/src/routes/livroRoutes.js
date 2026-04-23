// src/routes/livros.js
const express = require('express')
const router = express.Router()

const livroController = require("../controllers/livroController")

router.get('/livros', livroController.listarLivros) //GET - listar livros
router.get('/livros/:id', livroController.buscarPorId) //GET - buscar por id
router.post('/livros', livroController.criarLivro) //POST - cadastrar livro



module.exports = router