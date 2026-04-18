const service = require('../services/auth.service');

exports.cadastrar = async (req, res) => {
  try {
    const result = await service.cadastrar(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const result = await service.login(login, senha);
    res.json(result);
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};