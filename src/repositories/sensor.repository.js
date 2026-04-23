const { getConnection, sql } = require('../config/db');

exports.cadastrar = async ({ temperatura, umidade_solo, umidade_ar, usuarioId }) => {
  const pool = await getConnection();

  await pool.request()
    .input('temperatura', sql.Float, temperatura)
    .input('umidade_solo', sql.Float, umidade_solo)
    .input('umidade_ar', sql.Float, umidade_ar || null)
    .input('usuario_id', sql.Int, usuarioId)
    .query(`
      INSERT INTO sensor (temperatura, umidade_solo, umidade_ar, usuario_id, data_hora)
      VALUES (@temperatura, @umidade_solo, @umidade_ar, @usuario_id, GETDATE())
    `);
};

exports.listar = async () => {
  const pool = await getConnection();

  const result = await pool.request()
    .query(`
      SELECT TOP 100 *
      FROM sensor
      ORDER BY data_hora DESC
    `);

  return result.recordset;
};

exports.ultimo = async () => {
  const pool = await getConnection();

  const result = await pool.request()
    .query(`
      SELECT TOP 1 *
      FROM sensor
      ORDER BY data_hora DESC
    `);

  return result.recordset[0];
};