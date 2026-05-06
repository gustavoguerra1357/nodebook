// src/app.js
const express = require('express')
const app = express()

const cors = require('cors')

require('dotenv').config()

// rotas
const livrosRoutes = require('./routes/livroRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const emprestimoRoutes = require('./routes/emprestimoRoutes')

app.use(express.json()) // lê o body das requisições como JSON
app.use(cors({
  origin: 'http://localhost:5173' // só aceita o front local
}))

app.use(livrosRoutes)
app.use(usuarioRoutes)
app.use(emprestimoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})