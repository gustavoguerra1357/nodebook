const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,              // máximo de conexões simultâneas no pool
  idleTimeoutMillis: 30000,   // fecha conexão ociosa após 30s
  connectionTimeoutMillis: 2000, // erro se não conseguir conexão em 2s
})

// testa a conexão ao iniciar o servidor
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message)
    return
  }
  console.log('Conectado ao PostgreSQL com sucesso')
  release() // devolve a conexão pro pool
})

module.exports = pool