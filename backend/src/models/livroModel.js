const pool = require('../db/pool')

const livroModel = {
    listarTodos: async () => {
        const resultado = await pool.query(
            'SELECT * FROM livros ORDER BY titulo'
        )
        return resultado.rows

    },
    buscarPorId: async (id) => {
      const resultado = await pool.query(
        'SELECT * FROM livros WHERE id = $1',
        [id]
    )
    return resultado.rows[0]

    },
    criar: async (titulo, autor, isbn, quantidade) => {
        const resultado = await pool.query(
            `INSERT INTO livros (titulo, autor, isbn, quantidade_total, quantidade_disponivel)
            VALUES ($1, $2, $3, $4, $4)
            RETURNING *`,
            [titulo, autor, isbn, quantidade]
        )
        return resultado.rows[0]

    },
    atualizar: async (id, titulo, autor, isbn) => {
        const resultado = await pool.query(
            `UPDATE livros
            SET titulo = $1, autor = $2, isbn = $3
            WHERE id = $4
            RETURNING *`,
            [titulo, autor, isbn, id]
        )
        return resultado.rows[0]

    },
    deletar: async (id) => {
        await pool.query('DELETE FROM livros WHERE id = $1', [id])
    },
    // Essas duas funções são chamadas juntas quando admin aprova ou confirma devolução
    decrementarDisponivel: async (id) => {
        await pool.query('UPDATE livros SET quantidade_disponivel = quantidade_disponivel - 1 WHERE id = $1', [id]
    )

    },
    incrementarDisponivel: async (id) => {
        await pool.query('UPDATE livros SET quantidade_disponivel = quantidade_disponivel + 1 WHERE id = $1',[id])
    }
}


module.exports = livroModel