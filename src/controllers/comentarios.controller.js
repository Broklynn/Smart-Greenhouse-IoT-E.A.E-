const service = require('../services/comentarios.service');

exports.criar = async (req, res) => {
  try {
    await service.criar(req.body);
    res.status(201).json({ mensagem: 'Comentário salvo' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  const data = await service.listar();
  res.json(data);
};