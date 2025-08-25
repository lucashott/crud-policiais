const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");

const router = express.Router();

// Função simples para validar CPF
function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf); // Apenas checa 11 dígitos numéricos
}

// POST /policiais - cadastrar
router.post("/", async (req, res) => {
  try {
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;

    if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const hashMatricula = await bcrypt.hash(matricula, 10);

    const sql = `
      INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [rg_civil, rg_militar, cpf, data_nascimento, hashMatricula]);

    res.status(201).json({ message: "Policial cadastrado com sucesso", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar policial", details: err.message });
  }
});

// GET /policiais - listar
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, rg_civil, rg_militar, cpf, data_nascimento, matricula FROM policiais");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar policiais", details: err.message });
  }
});

module.exports = router;
