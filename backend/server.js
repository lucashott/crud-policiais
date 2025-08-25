// Importa os pacotes necessários
const express = require("express");
const cors = require("cors"); // 1. Importa o pacote CORS
require("dotenv").config();

// Importa o seu arquivo de rotas
const policiaisRoutes = require("./routes/policiais");

// Cria a instância do aplicativo Express
const app = express();

app.use(cors());

// 3. Substitui o `body-parser` obsoleto pelo middleware nativo do Express.
app.use(express.json());

// --- Registro das Rotas ---

// Registra as rotas dos policiais sob o prefixo '/api/policiais'
app.use("/api/policiais", policiaisRoutes);

// --- Inicialização do Servidor ---

// Define a porta a partir do arquivo .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor para "escutar" as requisições na porta definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Exporta o 'app' para possíveis testes ou outros usos (boa prática)
module.exports = app;
