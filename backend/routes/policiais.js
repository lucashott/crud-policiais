const express = require('express');
const router = express.Router();

// 1. Importa a conexão real com o banco de dados
const db = require('../db');

// Rota para LISTAR todos os policiais (lendo do MySQL)
router.get('/', async (req, res) => {
  try {
    const { busca } = req.query;
    let query = 'SELECT id, rg_civil, rg_militar, cpf, data_nascimento, matricula FROM policiais';
    const params = [];

    if (busca) {
      query += ' WHERE rg_civil LIKE ? OR rg_militar LIKE ? OR cpf LIKE ?';
      params.push(`%${busca}%`, `%${busca}%`, `%${busca}%`);
    }

    const [rows] = await db.execute(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('ERRO AO LISTAR POLICIAIS:', error);
    res.status(500).json({ message: 'Erro ao buscar a lista de policiais.' });
  }
});

// Rota para BUSCAR um policial por ID (lendo do MySQL)
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
    console.error(`ERRO AO BUSCAR POLICIAL ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao buscar o policial.' });
  }
});

// Rota para CRIAR um novo policial (salvando no MySQL)
router.post('/', async (req, res) => {
  try {
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;

    if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // --- CORREÇÃO DA DATA APLICADA AQUI ---
    // 1. Cria um objeto Date a partir da string recebida do frontend.
    const dataObj = new Date(data_nascimento);
    // 2. Extrai o ano, mês e dia. O getMonth() é baseado em zero (0-11), então somamos 1.
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Garante dois dígitos (ex: 07)
    const dia = String(dataObj.getDate()).padStart(2, '0');      // Garante dois dígitos (ex: 09)
    // 3. Monta a string no formato que o MySQL aceita.
    const dataFormatadaParaMySQL = `${ano}-${mes}-${dia}`;
    // -----------------------------------------

    const matriculaParaSalvar = matricula; // Lógica de criptografia virá aqui

    const query = `
      INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula)
      VALUES (?, ?, ?, ?, ?)
    `;
    // Usa a data formatada na inserção
    const values = [rg_civil, rg_militar, cpf, dataFormatadaParaMySQL, matriculaParaSalvar];

    const [result] = await db.execute(query, values);

    const novoPolicial = { id: result.insertId, ...req.body, data_nascimento: dataFormatadaParaMySQL };
    res.status(201).json(novoPolicial);

  } catch (error) {
    console.error('ERRO AO CADASTRAR POLICIAL:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'RG Civil, RG Militar ou CPF já cadastrados.' });
    }
    res.status(500).json({ message: 'Ocorreu um erro no servidor ao tentar cadastrar.' });
  }
});


// Rota para ATUALIZAR um policial (atualizando no MySQL)
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
    console.error(`ERRO AO ATUALIZAR POLICIAL ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao atualizar o policial.' });
  }
});

// Rota para EXCLUIR um policial (excluindo do MySQL)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM policiais WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Policial não encontrado para exclusão.' });
    }
  } catch (error) {
    console.error(`ERRO AO EXCLUIR POLICIAL ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erro ao excluir o policial.' });
  }
});

module.exports = router;
