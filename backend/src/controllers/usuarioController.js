const usuarioService = require('../services/usuarioService')

const usuarioController = {
    listarTodos: async (req, res) => {
        try {
            const resultado = await usuarioService.listarTodos()
            res.status(200).json(resultado)
        }
        catch(error) {
            console.error('Erro ao listar usuarios:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params
            const usuario = await usuarioService.buscarPorId(id)
            res.json(usuario)
        } catch (error) {
            console.error('Erro ao buscar usuario:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },

    criar: async (req, res) => {
        try {
            const {nome, email, senha_hash, role} = req.body
            const novoUsuario = await usuarioService.criar(nome, email, senha_hash, role);
            res.status(201).json(novoUsuario)
        }
        catch(error) {
            console.error('Erro ao criar usuario:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
        
    },
    deletar: async (req, res) => {
        try {
            const { id } = req.params
            await usuarioService.deletar(id)
            res.status(204).send()
        } catch (error) {
            console.error('Erro ao deletar usuario:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    },
    atualizar: async (req, res) => {
        try {
            const { id } = req.params
            const { nome, email, senha_hash, role } = req.body
            const usuarioAtualizado = await usuarioService.atualizar(id, nome, email, senha_hash, role)
            res.json(usuarioAtualizado)
        } catch (error) {
            console.error('Erro ao atualizar usuario:', error)
            res.status(error.status || 500).json({ erro: error.message })
        }
    }
}

module.exports = usuarioController