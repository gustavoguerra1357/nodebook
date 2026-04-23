const livroModel = require('../models/livroModel')
 
const livroController = {
    listarLivros: async (req, res) => {
        try {
            const livros = await livroModel.listarTodos()
            res.json(livros)
        } catch (error) {
            console.error('Erro ao listar livros:', error)
            res.status(500).json({ erro: 'Erro interno ao listar livros' })
        }
    },
 
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params
            const livro = await livroModel.buscarPorId(id)
 
            if (!livro) {
                return res.status(404).json({ erro: 'Livro não encontrado' })
            }
 
            res.json(livro)
        } catch (error) {
            console.error('Erro ao buscar livro:', error)
            res.status(500).json({ erro: 'Erro interno ao buscar livro' })
        }
    },
 
    criarLivro: async (req, res) => {
        try {
            const { titulo, autor, isbn, quantidade } = req.body
 
            if (!titulo || !autor || !isbn || !quantidade) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios: titulo, autor, isbn, quantidade' })
            }
 
            if (quantidade < 1) {
                return res.status(400).json({ erro: 'A quantidade deve ser maior que zero' })
            }
 
            const novoLivro = await livroModel.criar(titulo, autor, isbn, quantidade)
            res.status(201).json(novoLivro)
        } catch (error) {
            console.error('Erro ao criar livro:', error)
            res.status(500).json({ erro: 'Erro interno ao criar livro' })
        }
    },
 
    atualizarLivro: async (req, res) => {
        try {
            const { id } = req.params
            const { titulo, autor, isbn } = req.body
 
            if (!titulo || !autor || !isbn) {
                return res.status(400).json({ erro: 'Todos os campos são obrigatórios: titulo, autor, isbn' })
            }
 
            const livroExiste = await livroModel.buscarPorId(id)
            if (!livroExiste) {
                return res.status(404).json({ erro: 'Livro não encontrado' })
            }
 
            const livroAtualizado = await livroModel.atualizar(id, titulo, autor, isbn)
            res.json(livroAtualizado)
        } catch (error) {
            console.error('Erro ao atualizar livro:', error)
            res.status(500).json({ erro: 'Erro interno ao atualizar livro' })
        }
    },
 
    deletarLivro: async (req, res) => {
        try {
            const { id } = req.params
 
            const livroExiste = await livroModel.buscarPorId(id)
            if (!livroExiste) {
                return res.status(404).json({ erro: 'Livro não encontrado' })
            }
 
            await livroModel.deletar(id)
            res.status(204).send()
        } catch (error) {
            console.error('Erro ao deletar livro:', error)
            res.status(500).json({ erro: 'Erro interno ao deletar livro' })
        }
    }
}
 
module.exports = livroController