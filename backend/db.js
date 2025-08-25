// backend/config/db.js

const mysql = require('mysql2');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// Cria um "pool" de conexões com o banco de dados
// Um pool é mais eficiente pois reutiliza conexões em vez de abrir e fechar a cada consulta
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Espera por uma conexão se todas estiverem em uso
  connectionLimit: 10,       // Número máximo de conexões no pool
  queueLimit: 0              // Requisições enfileiradas sem limite
});

// Converte o pool para usar Promises em vez de callbacks, o que deixa o código mais limpo
// Agora podemos usar async/await com nossas consultas
const promisePool = pool.promise();

console.log('Pool de conexões com o MySQL criado com sucesso!');

// Exporta o pool de conexões com suporte a Promises para ser usado em outros arquivos
module.exports = promisePool;
