const { getConnection, sql } = require('../config/db');

exports.buscarUsuario = async (login) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('login', sql.VarChar, login)
    .query(`
      SELECT * FROM usuarios
      WHERE usuario = @login OR email = @login
    `);

  return result.recordset[0];
};

exports.criarUsuario = async (dados) => {
  const pool = await getConnection();

  await pool.request()
    .input('nome', sql.VarChar, dados.nome)
    .input('usuario', sql.VarChar, dados.usuario)
    .input('email', sql.VarChar, dados.email)
    .input('senha', sql.VarChar, dados.senha)
    .input('telefone', sql.VarChar, dados.telefone)
    .input('dataNascimento', sql.Date, dados.dataNascimento)
    .query(`
      INSERT INTO usuarios (nome, usuario, email, senha, telefone, data_nascimento)
      VALUES (@nome, @usuario, @email, @senha, @telefone, @dataNascimento)
    `);
};