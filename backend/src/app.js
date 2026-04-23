// src/app.js
const express = require('express')
const app = express()
require('dotenv').config()

// rotas
const livrosRoutes = require('./routes/livroRoutes')

app.use(express.json()) // lê o body das requisições como JSON

app.use(livrosRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})