const { getConnection, sql } = require('../config/db');

exports.salvar = async (texto, usuarioId) => {
  const pool = await getConnection();

  await pool.request()
    .input('texto', sql.NVarChar, texto)
    .input('usuarioId', sql.Int, usuarioId)
    .query(`
      INSERT INTO comentarios (texto, usuario_id)
      VALUES (@texto, @usuarioId)
    `);
};

exports.listar = async () => {
  const pool = await getConnection();

  const result = await pool.request().query(`
    SELECT c.id, c.texto, c.data, u.nome
    FROM comentarios c
    JOIN usuarios u ON c.usuario_id = u.id
    ORDER BY c.data DESC
  `);

  return result.recordset;
};