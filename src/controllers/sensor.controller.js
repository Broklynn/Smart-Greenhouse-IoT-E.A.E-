const service = require('../services/sensor.service');

exports.cadastrar = async (req, res) => {
  try {
    const { temperatura, umidade_solo, umidade_ar } = req.body;

    const usuarioId = req.usuario.id;

    if (!temperatura || !umidade_solo) {
      return res.status(400).json({
        erro: 'Dados incompletos'
      });
    }

    await service.cadastrar({
      temperatura,
      umidade_solo,
      umidade_ar,
      usuarioId
    });

    res.status(201).json({
      mensagem: 'Sensor salvo com sucesso'
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const dados = await service.listar();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.ultimo = async (req, res) => {
  try {
    const dado = await service.ultimo();

    if (!dado) {
      return res.status(404).json({
        erro: 'Nenhum dado encontrado'
      });
    }

    res.json(dado);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};