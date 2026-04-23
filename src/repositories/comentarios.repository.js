const { getConnection, sql } = require('../config/db');

function aplicarFiltros(request, { search, usuarioId }) {
  const filtros = [];

  if (search) {
    filtros.push('c.texto LIKE @search');
    request.input('search', sql.NVarChar(500), `%${search}%`);
  }

  if (usuarioId !== undefined) {
    filtros.push('c.usuario_id = @usuarioId');
    request.input('usuarioId', sql.Int, usuarioId);
  }

  if (filtros.length === 0) {
    return '';
  }

  return `WHERE ${filtros.join(' AND ')}`;
}

exports.salvar = async (texto, usuarioId) => {
  const pool = await getConnection();

  await pool.request()
    .input('texto', sql.NVarChar(500), texto)
    .input('usuarioId', sql.Int, usuarioId)
    .query(`
      INSERT INTO comentarios (texto, usuario_id)
      VALUES (@texto, @usuarioId)
    `);
};

exports.listar = async ({ offset, limit, search, usuarioId }) => {
  const pool = await getConnection();

  const countRequest = pool.request();
  const whereClause = aplicarFiltros(countRequest, { search, usuarioId });

  const totalResult = await countRequest.query(`
    SELECT COUNT(*) AS total
    FROM comentarios c
    ${whereClause}
  `);

  const dataRequest = pool.request();
  const dataWhereClause = aplicarFiltros(dataRequest, { search, usuarioId });

  const dataResult = await dataRequest
    .input('offset', sql.Int, offset)
    .input('limit', sql.Int, limit)
    .query(`
      SELECT c.id, c.texto, c.usuario_id AS usuarioId, c.data, u.nome
      FROM comentarios c
      JOIN usuarios u ON c.usuario_id = u.id
      ${dataWhereClause}
      ORDER BY c.data DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `);

  return {
    total: totalResult.recordset[0].total,
    data: dataResult.recordset
  };
};

exports.buscarPorId = async (id) => {
  const pool = await getConnection();

  const result = await pool.request()
    .input('id', sql.Int, id)
    .query(`
      SELECT id, texto, usuario_id AS usuarioId, data
      FROM comentarios
      WHERE id = @id
    `);

  return result.recordset[0];
};

exports.atualizar = async (id, texto) => {
  const pool = await getConnection();

  await pool.request()
    .input('id', sql.Int, id)
    .input('texto', sql.NVarChar(500), texto)
    .query(`
      UPDATE comentarios
      SET texto = @texto
      WHERE id = @id
    `);
};

exports.deletar = async (id) => {
  const pool = await getConnection();

  await pool.request()
    .input('id', sql.Int, id)
    .query(`
      DELETE FROM comentarios
      WHERE id = @id
    `);
};
