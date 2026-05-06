const emprestimoService = require('../services/emprestimoService')

const emprestimoController = {
    listarTodos: async (req, res) => {
        try {
            const emprestimos = await emprestimoService.listarTodos()
            res.json(emprestimos)
        } catch (error) {
            console.error('Erro ao listar empréstimos:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },
    listarPendentes: async (req, res) => {
        try {
            const emprestimos = await emprestimoService.listarPendentes()
            res.json(emprestimos)
        } catch (error) {
            console.error('Erro ao listar empréstimos pendentes:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params
            const emprestimo = await emprestimoService.buscarPorId(id)
            res.json(emprestimo)
        } catch (error) {
            console.error('Erro ao buscar empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    criar: async (req, res) => {
        try {
            const { usuarioId, livroId, dataPrevista } = req.body
            const emprestimo = await emprestimoService.criar(usuarioId, livroId, dataPrevista)
            res.status(201).json(emprestimo)
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    aprovar: async (req, res) => {
        try {
            const { id } = req.params
            const emprestimo = await emprestimoService.aprovar(id)
            res.json(emprestimo)
        } catch (error) {
            console.error('Erro ao aprovar empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    rejeitar: async (req, res) => {
        try {
            const { id } = req.params
            const emprestimo = await emprestimoService.rejeitar(id)
            res.json(emprestimo)
        } catch (error) {
            console.error('Erro ao rejeitar empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    devolver: async (req, res) => {
        try {
            const { id } = req.params
            const emprestimo = await emprestimoService.devolver(id)
            res.json(emprestimo)
        } catch (error) {
            console.error('Erro ao devolver empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },
    solicitarDevolucao: async (req, res) => {
        try {
            const { id } = req.params
            const emprestimo = await emprestimoService.solicitarDevolucao(id)
            res.json(emprestimo)
        } catch (error) {
            console.error('Erro ao solicitar devolução de empréstimo:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    }
}

module.exports = emprestimoController
