// backend/routes/policiais.js

const express = require('express');
const router = express.Router();

// --- DADOS FALSOS (MOCK DATA) ---
// Este array simula nosso banco de dados.
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

// Rota para LISTAR todos os policiais (GET /api/policiais) - COM LÓGICA DE FILTRO
router.get('/', (req, res) => {
  try {
    // Pega o termo de busca da query string da URL (ex: ?busca=valor)
    const { busca } = req.query;

    // Se não houver termo de busca, retorna a lista completa
    if (!busca) {
      console.log('ROTA DE LISTAGEM: Enviando a lista completa de policiais.');
      return res.status(200).json(mockPoliciais);
    }

    // Se houver um termo de busca, filtra o array
    console.log(`ROTA DE LISTAGEM: Filtrando policiais com o termo "${busca}"`);
    
    // Converte o termo de busca para minúsculas para uma busca case-insensitive
    const termoBuscaLowerCase = busca.toLowerCase();

    // Usa o método .filter() do array para criar uma nova lista com os resultados
    const policiaisFiltrados = mockPoliciais.filter(policial => {
      // Verifica se o termo de busca está contido em algum dos campos
      const rgCivilMatch = policial.rg_civil.toLowerCase().includes(termoBuscaLowerCase);
      const rgMilitarMatch = policial.rg_militar.toLowerCase().includes(termoBuscaLowerCase);
      const cpfMatch = policial.cpf.toLowerCase().includes(termoBuscaLowerCase);
      
      // Retorna true se encontrou em qualquer um dos campos
      return rgCivilMatch || rgMilitarMatch || cpfMatch;
    });

    // Retorna a lista filtrada
    res.status(200).json(policiaisFiltrados);

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
