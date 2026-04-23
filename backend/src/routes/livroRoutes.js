// src/routes/livros.js
const express = require('express')
const router = express.Router()

const livroController = require("../controllers/livroController")

router.get('/livros', livroController.listarLivros)


module.exports = router