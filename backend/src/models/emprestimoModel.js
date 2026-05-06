const pool = require('../db/pool')

const emprestimoModel = {
    listarTodos: async () => {
        const resultado = await pool.query('SELECT * FROM emprestimos ORDER BY id DESC')
        return resultado.rows
    },
    listarPendentes: async () => {
        const resultado = await pool.query('SELECT * FROM emprestimos WHERE status = \'pendente\'')
        return resultado.rows
    },

    buscarPorId: async (id, client = pool) => {
        const resultado = await client.query(
            'SELECT * FROM emprestimos WHERE id = $1',
            [id]
        )
        return resultado.rows[0]
    },

    criar: async (usuarioId, livroId, dataPrevista) => {
        const resultado = await pool.query(
            `INSERT INTO emprestimos (usuario_id, livro_id, status, data_emprestimo, data_prevista, data_devolucao)
            VALUES ($1, $2, 'pendente', CURRENT_DATE, $3, NULL)
            RETURNING *`,
            [usuarioId, livroId, dataPrevista]
        )
        return resultado.rows[0]
    },

    atualizarStatus: async (id, status, client = pool) => {
        const resultado = await client.query(
            `UPDATE emprestimos
            SET status = $1
            WHERE id = $2
            RETURNING *`,
            [status, id]
        )
        return resultado.rows[0]
    },

    //Aqui é como se o emprestimo devolvido e finalizado a data de devolução é atualizada
    //E o status é atualizado para 'devolvido'
    marcarDevolucao: async (id, client = pool) => {
        const resultado = await client.query(
            `UPDATE emprestimos
            SET status = 'devolvido', data_devolucao = CURRENT_DATE
            WHERE id = $1
            RETURNING *`,
            [id]
        )
        return resultado.rows[0]
    }
}

module.exports = emprestimoModel
