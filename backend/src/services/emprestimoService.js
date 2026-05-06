const pool = require('../db/pool')
const emprestimoModel = require('../models/emprestimoModel')
const usuarioModel = require('../models/usuarioModel')
const livroModel = require('../models/livroModel')

const emprestimoService = {
    listarTodos: async () => {
        return await emprestimoModel.listarTodos()
    },
    //Os pendentes são os emprestimos que ainda não foram aprovados pelo bibliotecario
    listarPendentes: async () => {
        return await emprestimoModel.listarPendentes()
    },

    buscarPorId: async (id) => {
        const emprestimo = await emprestimoModel.buscarPorId(id)

        if (!emprestimo) {
            const erro = new Error('Empréstimo não encontrado')
            erro.status = 404
            throw erro
        }

        return emprestimo
    },

    criar: async (usuarioId, livroId, dataPrevista) => {
        if (!usuarioId || !livroId || !dataPrevista) {
            const erro = new Error('Todos os campos são obrigatórios: usuarioId, livroId, dataPrevista')
            erro.status = 400
            throw erro
        }

        const usuario = await usuarioModel.buscarPorId(usuarioId)
        if (!usuario) {
            const erro = new Error('Usuário não encontrado')
            erro.status = 404
            throw erro
        }

        const livro = await livroModel.buscarPorId(livroId) //retorna {id: 1, titulo: 'Livro 1', autor: 'Autor 1', isbn: '1234567890', quantidade_disponivel: 10}
        if (!livro) {
            const erro = new Error('Livro não encontrado')
            erro.status = 404
            throw erro
        }

        if (livro.quantidade_disponivel <= 0) {
            const erro = new Error('Não há exemplares disponíveis para empréstimo')
            erro.status = 409
            throw erro
        }

        const hoje = new Date()
        const prevista = new Date(dataPrevista)
        if (Number.isNaN(prevista.getTime()) || prevista < hoje) {
            const erro = new Error('dataPrevista deve ser uma data válida e não pode estar no passado')
            erro.status = 400
            throw erro
        }

        return await emprestimoModel.criar(usuarioId, livroId, dataPrevista)
    },

    //Vai ser executado pelo bibliotecario
    aprovar: async (id) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')

            const emprestimo = await emprestimoModel.buscarPorId(id, client)
            if (!emprestimo) {
                const erro = new Error('Empréstimo não encontrado')
                erro.status = 404
                throw erro
            }

            if (emprestimo.status !== 'pendente') {
                const erro = new Error('Só é possível aprovar empréstimo com status pendente')
                erro.status = 409
                throw erro
            }

            const livro = await livroModel.buscarPorId(emprestimo.livro_id, client)
            if (!livro || livro.quantidade_disponivel <= 0) {
                const erro = new Error('Livro indisponível para aprovação do empréstimo')
                erro.status = 409
                throw erro
            }

            await livroModel.decrementarDisponivel(emprestimo.livro_id, client)
            const emprestimoAtualizado = await emprestimoModel.atualizarStatus(id, 'ativo', client)

            await client.query('COMMIT')
            return emprestimoAtualizado
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    },

    //vai ser executado pelo bibliotecario
    rejeitar: async (id) => {
        const emprestimo = await emprestimoModel.buscarPorId(id)
        if (!emprestimo) {
            const erro = new Error('Empréstimo não encontrado')
            erro.status = 404
            throw erro
        }

        if (emprestimo.status !== 'pendente') {
            const erro = new Error('Só é possível rejeitar empréstimo com status pendente')
            erro.status = 409
            throw erro
        }

        return await emprestimoModel.atualizarStatus(id, 'rejeitado')
    },

    //vai ser executado pelo usuario
    devolver: async (id) => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')

            const emprestimo = await emprestimoModel.buscarPorId(id, client)
            if (!emprestimo) {
                const erro = new Error('Empréstimo não encontrado')
                erro.status = 404
                throw erro
            }

            if (emprestimo.status !== 'ativo' && emprestimo.status !== 'devolucao_pendente') {
                const erro = new Error('Só é possível devolver empréstimo ativo ou em devolução pendente')
                erro.status = 409
                throw erro
            }

            await livroModel.incrementarDisponivel(emprestimo.livro_id, client)
            const emprestimoAtualizado = await emprestimoModel.marcarDevolucao(id, client)

            await client.query('COMMIT')
            return emprestimoAtualizado
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    },

    //Vai ser executado pelo usuario
    solicitarDevolucao: async (id) => {
        const emprestimo = await emprestimoModel.buscarPorId(id)
        if (!emprestimo) {
            const erro = new Error('Empréstimo não encontrado')
            erro.status = 404
            throw erro
        }
        if (emprestimo.status !== 'ativo') {
            const erro = new Error('Só é possível solicitar devolução de empréstimo ativo')
            erro.status = 409
            throw erro
        }

        const hoje = new Date()
        if (emprestimo.data_prevista > hoje) {
            //Gerar Multa Futuramente
        }
        return await emprestimoModel.atualizarStatus(id, 'devolucao_pendente')
    }
    

}

module.exports = emprestimoService
