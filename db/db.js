const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'myapp',
  password: process.env.DB_PASSWORD || 'secret',
  port: Number(process.env.DB_PORT) || 5432
})

module.exports = pool