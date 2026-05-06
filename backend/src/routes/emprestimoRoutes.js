const express = require('express')
const emprestimoRoutes = express.Router() 

const emprestimoController = require('../controllers/emprestimoController')

emprestimoRoutes.get('/emprestimos', emprestimoController.listarTodos)  //GET - criar emprestimo 
emprestimoRoutes.get('/emprestimos/pendentes', emprestimoController.listarPendentes) //GET - listar pendentes 
emprestimoRoutes.get('/emprestimos/:id', emprestimoController.buscarPorId) //GET - buscar por id 

emprestimoRoutes.post('/emprestimos', emprestimoController.criar) //POST - criar emprestimo 

emprestimoRoutes.patch('/emprestimos/:id/aprovar', emprestimoController.aprovar) //PATCH - aprovar emprestimo 
emprestimoRoutes.patch('/emprestimos/:id/rejeitar', emprestimoController.rejeitar) //PATCH - rejeitar emprestimo 
emprestimoRoutes.patch('/emprestimos/:id/devolver', emprestimoController.devolver) //PATCH - devolver emprestimo 
emprestimoRoutes.patch('/emprestimos/:id/solicitarDevolucao', emprestimoController.solicitarDevolucao) //PATCH - solicitar devolução 

module.exports = emprestimoRoutes
