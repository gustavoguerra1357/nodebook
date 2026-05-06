const pool = require('../db/pool')


//CRUD SIMPLES
const usuarioModel = {
    listarTodos: async () => {
        const resultado = await pool.query('SELECT * FROM usuarios')
        return resultado.rows //Retorna todos os usuarios
    },
    buscarPorId: async (id) => {
        const resultado = await pool.query('SELECT * FROM usuarios where id = $1', [id])
        return resultado.rows[0] //Retorna todos os usuarios
    },
    criar: async (nome, email, senha_hash, role) => {
        const resultado = await pool.query(
            `INSERT INTO usuarios (nome, email, senha_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [nome, email, senha_hash, role]
        ) 
        return resultado.rows[0] //Insere e retorna o usuario criado
    },
    deletar: async (id) => {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id])
    },
    atualizar: async (id, nome, email, senha_hash, role) => {
        const resultado = await pool.query(
            `UPDATE usuarios
            SET nome = $2, email = $3, senha_hash = $4, role = $5
            WHERE id = $1
            RETURNING *`,
            [id, nome, email, senha_hash, role]
        )
        return resultado.rows[0]
    },

}

module.exports = usuarioModel