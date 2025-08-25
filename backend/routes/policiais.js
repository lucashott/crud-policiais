const express = require('express');
const router = express.Router();

// --- DADOS FALSOS (MOCK DATA) ---
const mockPoliciais = [
  {
    id: 1,
    rg_civil: '11222333-4',
    rg_militar: '123456',
    cpf: '111.222.333-44',
    data_nascimento: '1990-05-15', 
    matricula: '987654'
  },
  {
    id: 2,
    rg_civil: '55666777-8',
    rg_militar: '654321',
    cpf: '555.666.777-88',
    data_nascimento: '1985-11-20', 
    matricula: '123456'
  },
  {
    id: 3,
    rg_civil: '22107059-2',
    rg_militar: '54023',
    cpf: '221.070.592-10',
    data_nascimento: '1988-02-07', 
    matricula: '874512'
  },
  {
    id: 4,
    rg_civil: '33445566-7',
    rg_militar: '87654',
    cpf: '334.455.667-80',
    data_nascimento: '1992-09-25', 
    matricula: '562314'
  },
  {
    id: 5,
    rg_civil: '44556677-1',
    rg_militar: '102345',
    cpf: '445.566.771-95',
    data_nascimento: '1983-03-13', 
    matricula: '998877'
  },
  {
    id: 6,
    rg_civil: '55667788-9',
    rg_militar: '110999',
    cpf: '556.677.889-02',
    data_nascimento: '1995-08-30', 
    matricula: '334455'
  }
];

// Rota para LISTAR todos os policiais (GET /api/policiais)
router.get('/', (req, res) => {
  try {
    const { busca } = req.query;
    if (!busca) {
      console.log('ROTA DE LISTAGEM: Enviando a lista completa de policiais.');
      return res.status(200).json(mockPoliciais);
    }
    const termoBuscaLowerCase = busca.toLowerCase();
    const policiaisFiltrados = mockPoliciais.filter(policial => 
      policial.rg_civil.toLowerCase().includes(termoBuscaLowerCase) ||
      policial.rg_militar.toLowerCase().includes(termoBuscaLowerCase) ||
      policial.cpf.toLowerCase().includes(termoBuscaLowerCase)
    );
    res.status(200).json(policiaisFiltrados);
  } catch (error) {
    console.error('ROTA DE LISTAGEM: Ocorreu um erro:', error);
    res.status(500).json({ message: 'Erro ao buscar a lista de policiais.' });
  }
});

// Rota para CRIAR um novo policial (POST /api/policiais)
router.post('/', (req, res) => {
  try {
    const dadosDoPolicial = req.body;
    if (!dadosDoPolicial.cpf || !dadosDoPolicial.matricula) {
      return res.status(400).json({ message: 'CPF e Matrícula são obrigatórios.' });
    }
    const novoPolicial = { id: Date.now(), ...dadosDoPolicial };
    mockPoliciais.push(novoPolicial);
    res.status(201).json(novoPolicial);
  } catch (error) {
    console.error('ROTA DE CADASTRO: Ocorreu um erro inesperado:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM policiais WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Policial não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o policial.' });
  }
});

// PUT /api/policiais/:id (Atualizar um policial)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;

    const query = `
      UPDATE policiais 
      SET rg_civil = ?, rg_militar = ?, cpf = ?, data_nascimento = ?, matricula = ?
      WHERE id = ?
    `;
    const values = [rg_civil, rg_militar, cpf, data_nascimento, matricula, id];
    
    const [result] = await db.execute(query, values);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Policial atualizado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Policial não encontrado para atualização.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o policial.' });
  }
});

// DELETE /api/policiais/:id (Excluir um policial)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM policiais WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      // Status 204 (No Content) é uma resposta padrão para exclusões bem-sucedidas.
      res.status(204).send(); 
    } else {
      res.status(404).json({ message: 'Policial não encontrado para exclusão.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o policial.' });
  }
});

module.exports = router;