const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Cria um "pool" de conexões com o banco de dados
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, 
  connectionLimit: 10,       
  queueLimit: 0              
});

// Converte o pool para usar Promises em vez de callbacks, o que deixa o código mais limpo
const promisePool = pool.promise();

console.log('Pool de conexões com o MySQL criado com sucesso!');

// Exporta o pool de conexões com suporte a Promises para ser usado em outros arquivos
module.exports = promisePool;
