const livroModel = require('../models/livroModel')

const livroService = {
    listarTodos: async () => {
        return await livroModel.listarTodos()
    },

    buscarPorId: async (id) => {
        const livro = await livroModel.buscarPorId(id)

        if (!livro) {
            const erro = new Error('Livro não encontrado')
            erro.status = 404
            throw erro
        }

        return livro
    },

    criar: async (titulo, autor, isbn, quantidade) => {
        if (!titulo || !autor || !isbn || !quantidade) {
            const erro = new Error('Todos os campos são obrigatórios: titulo, autor, isbn, quantidade')
            erro.status = 400
            throw erro
        }

        if (quantidade < 1) {
            const erro = new Error('A quantidade deve ser maior que zero')
            erro.status = 400
            throw erro
        }

        const isbnJaExiste = await livroModel.buscarPorIsbn(isbn)
        if (isbnJaExiste) {
            const erro = new Error('Já existe um livro cadastrado com esse ISBN')
            erro.status = 409
            throw erro
        }

        return await livroModel.criar(titulo, autor, isbn, quantidade)
    },

    atualizar: async (id, titulo, autor, isbn) => {
        if (!titulo || !autor || !isbn) {
            const erro = new Error('Todos os campos são obrigatórios: titulo, autor, isbn')
            erro.status = 400
            throw erro
        }

        const livroExiste = await livroModel.buscarPorId(id)
        if (!livroExiste) {
            const erro = new Error('Livro não encontrado')
            erro.status = 404
            throw erro
        }

        const isbnEmUso = await livroModel.buscarPorIsbn(isbn)
        if (isbnEmUso && isbnEmUso.id !== Number(id)) {
            const erro = new Error('Esse ISBN já está cadastrado em outro livro')
            erro.status = 409
            throw erro
        }

        return await livroModel.atualizar(id, titulo, autor, isbn)
    },

    deletar: async (id) => {
        const livro = await livroModel.buscarPorId(id)
        if (!livro) {
            const erro = new Error('Livro não encontrado')
            erro.status = 404
            throw erro
        }

        if (livro.quantidade_disponivel < livro.quantidade_total) {
            const erro = new Error('Não é possível deletar um livro com exemplares emprestados')
            erro.status = 409
            throw erro
        }

        await livroModel.deletar(id)
    }
}

module.exports = livroService