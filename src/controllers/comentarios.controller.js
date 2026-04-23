const service = require('../services/comentarios.service');

exports.criar = async (req, res) => {
  try {
    const { texto } = req.body;
    const usuarioId = req.usuario.id;

    await service.criar({ texto, usuarioId });
    res.status(201).json({ mensagem: 'Comentario salvo' });
  } catch (err) {
    res.status(err.status || 400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const { page, limit, search, usuarioId } = req.query;
    const data = await service.listar({ page, limit, search, usuarioId });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.message });
  }
};

exports.listarMe = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const usuarioId = req.usuario.id;
    const data = await service.listarDoUsuario(usuarioId, { page, limit });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ erro: err.message });
  }
};

exports.editar = async (req, res) => {
  try {
    const { texto } = req.body;
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    await service.editarComentario(id, usuarioId, texto);
    res.json({ mensagem: 'Comentario atualizado' });
  } catch (err) {
    res.status(err.status || 400).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    await service.deletarComentario(id, usuarioId);
    res.json({ mensagem: 'Comentario removido' });
  } catch (err) {
    res.status(err.status || 400).json({ erro: err.message });
  }
};
