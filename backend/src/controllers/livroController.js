// src/controllers/livrosController.js
const pool = require('../db/pool')

// GET /livros — lista todos os livros
const livroController = {

    listarLivros: async (req,res) => {
        try {
            const resultado = await pool.query('SELECT * FROM livros ORDER BY titulo')
            res.json(resultado.rows) // resultado.rows é sempre um array
        } catch (erro) {
            console.error(erro)
            res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }
}




module.exports = livroController