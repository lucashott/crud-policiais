// Importa os pacotes necessários
const express = require("express");
const cors = require("cors"); // 1. Importa o pacote CORS
require("dotenv").config();

// Importa o seu arquivo de rotas
const policiaisRoutes = require("./routes/policiais");

// Cria a instância do aplicativo Express
const app = express();

// --- Configuração de Middlewares ---

// 2. Habilita o CORS para todas as requisições.
//    Esta é a correção principal. Deve vir ANTES do registro das rotas.
//    Isso adicionará os cabeçalhos 'Access-Control-Allow-Origin' necessários.
app.use(cors());

// 3. Substitui o `body-parser` obsoleto pelo middleware nativo do Express.
//    Isso permite que o servidor entenda o corpo de requisições em formato JSON.
app.use(express.json());

// --- Registro das Rotas ---

// Registra as rotas dos policiais sob o prefixo '/api/policiais'
// É uma boa prática adicionar um prefixo como '/api' para todas as suas rotas.
app.use("/api/policiais", policiaisRoutes);

// --- Inicialização do Servidor ---

// Define a porta a partir do arquivo .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor para "escutar" as requisições na porta definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Exporta o 'app' para possíveis testes ou outros usos (boa prática)
module.exports = app;
