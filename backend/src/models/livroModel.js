const pool = require('../db/pool')

const livroModel = {
    listarTodos: async () => {
        const resultado = await pool.query(
            'SELECT * FROM livros ORDER BY titulo'
        )
        return resultado.rows

    }
}


module.exports = livroModel