const express = require('express');
const router = express.Router();
const conexao = require('./servidor.js');

router.get('/cliente/:chave/:valor', (req, res) => {
    const { chave, valor } = req.params;
    let sql;
     if (chave === "id") {
      sql = `SELECT * FROM cliente WHERE id = ?`;
    } else if (chave === "email") {
      sql = `SELECT * FROM cliente WHERE email = ?`;
    } else {
      return res.status(400).send('Chave inválida');
    }
      conexao.query(sql, [valor], (err, result) => {
      if (err) {
        console.log(`Erro ao buscar dados no banco de dados: ${err.message}`);
        return res.status(500).send('Erro interno do servidor');
      }
      console.log(`Dados encontrados: ${JSON.stringify(result)}`);
      return res.status(200).send(result);
    });
  });

  
  
router.get('/cliente/tipo', (req, res) => {
        const sql = 'SELECT * FROM tipo';
        return conexao.query(sql, (err, result) => {
          if (err) {
            console.log(`Erro ao buscar tipos de clientes no banco de dados: ${err.message}`);
            return res.status(500).send('Erro interno do servidor');
          } else {
            console.log(`Tipos de clientes encontrados: ${JSON.stringify(result)}`);
            return res.status(200).send(result);
          }
        });
      });
      

router.post('/cliente/gravar',  (req, res) => {
const { nome, telefone, email, logradouro, numero, complemento,
    bairro, cidade, uf, cep, tipo } = req.body;
  
    const sql = 'INSERT INTO cliente (nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conexao.query(sql, [nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, tipo], (err, result) => {
    if (err) {
        console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
        res.status(500).send('Erro interno do servidor');
      } else {
        if (result.affectedRows > 0) {
          console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
        } else {
          console.log(`Erro ao inserir dados no banco de dados. Nenhum registro foi afetado.`);
          console.log(`Campo que causou o erro: ${err.sqlMessage}`);
        }
        res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      }
    });
  });
  module.exports = router;