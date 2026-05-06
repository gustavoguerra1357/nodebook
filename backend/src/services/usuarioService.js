const usuarioModel = require("../models/usuarioModel")

const usuarioService = {
    listarTodos: async () => {
        return await usuarioModel.listarTodos()
    },

    buscarPorId: async (id) => {
        const resultado = await usuarioModel.buscarPorId(id)

        if (!resultado) {
            const erro = new Error('Usuario não encontrado')
            erro.status = 404
            throw erro 
        }

        return resultado
    },
    criar: async (nome, email, senha_hash, role) => {
        if (!nome || !email || !senha_hash || !role) {
            const erro = new Error('Todos os campos são obrigatórios: nome, email, senha_hash, role')
            erro.status = 400
            throw erro
        }

        return await usuarioModel.criar(nome, email, senha_hash, role)
    },
    atualizar: async (id, nome, email, senha_hash, role) => {
        if (!nome || !email || !senha_hash || !role) {
            const erro = new Error('Todos os campos são obrigatórios: nome, email, senha_hash, role')
            erro.status = 400
            throw erro
        }

        const usuario = await usuarioModel.buscarPorId(id)
        if (!usuario) {
            const erro = new Error('Usuario não encontrado')
            erro.status = 404
            throw erro
        }

        return await usuarioModel.atualizar(id, nome, email, senha_hash, role)
    },
    deletar: async (id) => {
        const usuario = await usuarioModel.buscarPorId(id)
        if (!usuario) {
            const erro = new Error('Usuario não encontrado')
            erro.status = 404
            throw erro
        }

        await usuarioModel.deletar(id)
    }
}

module.exports = usuarioService