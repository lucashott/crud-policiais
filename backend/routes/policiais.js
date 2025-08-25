// backend/routes/policiais.js

const express = require('express');
const router = express.Router();

// --- DADOS FALSOS (MOCK DATA) ---
// Vamos criar um array para simular nosso banco de dados por enquanto.
// Cada vez que o servidor reiniciar, esta lista será resetada.
const mockPoliciais = [
  {
    id: 1,
    rg_civil: '11222333-4',
    rg_militar: 'PM-123456',
    cpf: '111.222.333-44',
    data_nascimento: '1990-05-15',
    matricula: '987654'
  },
  {
    id: 2,
    rg_civil: '55666777-8',
    rg_militar: 'PC-654321',
    cpf: '555.666.777-88',
    data_nascimento: '1985-11-20',
    matricula: '123456'
  }
];

// --- ROTAS ---

// Rota para LISTAR todos os policiais (GET /api/policiais)
// ESTA É A ROTA QUE ESTAVA FALTANDO
router.get('/', (req, res) => {
  try {
    console.log('ROTA DE LISTAGEM: Enviando a lista de policiais.');
    
    // Retorna a lista de dados falsos com status 200 (OK)
    res.status(200).json(mockPoliciais);

  } catch (error) {
    console.error('ROTA DE LISTAGEM: Ocorreu um erro:', error);
    res.status(500).json({ message: 'Erro ao buscar a lista de policiais.' });
  }
});

// Rota para CRIAR um novo policial (POST /api/policiais)
router.post('/', (req, res) => {
  try {
    console.log('ROTA DE CADASTRO: Corpo da requisição recebido:', req.body);
    const dadosDoPolicial = req.body;

    if (!dadosDoPolicial.cpf || !dadosDoPolicial.matricula) {
      return res.status(400).json({ message: 'CPF e Matrícula são obrigatórios.' });
    }

    const novoPolicial = { id: Date.now(), ...dadosDoPolicial };

    // Adiciona o novo policial à nossa lista de dados falsos
    mockPoliciais.push(novoPolicial);

    console.log('ROTA DE CADASTRO: Policial "salvo" com sucesso:', novoPolicial);
    res.status(201).json(novoPolicial);

  } catch (error) {
    console.error('ROTA DE CADASTRO: Ocorreu um erro inesperado:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

module.exports = router;
