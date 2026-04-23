const livroService = require('../services/livroService')

const livroController = {
    listarTodos: async (req, res) => {
        try {
            const livros = await livroService.listarTodos()
            res.json(livros)
        } catch (error) {
            console.error('Erro ao listar livros:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params
            const livro = await livroService.buscarPorId(id)
            res.json(livro)
        } catch (error) {
            console.error('Erro ao buscar livro:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    criar: async (req, res) => {
        try {
            const { titulo, autor, isbn, quantidade } = req.body
            const novoLivro = await livroService.criar(titulo, autor, isbn, quantidade)
            res.status(201).json(novoLivro)
        } catch (error) {
            console.error('Erro ao criar livro:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params
            const { titulo, autor, isbn } = req.body
            const livroAtualizado = await livroService.atualizar(id, titulo, autor, isbn)
            res.json(livroAtualizado)
        } catch (error) {
            console.error('Erro ao atualizar livro:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params
            await livroService.deletar(id)
            res.status(204).send()
        } catch (error) {
            console.error('Erro ao deletar livro:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    }
}

module.exports = livroController