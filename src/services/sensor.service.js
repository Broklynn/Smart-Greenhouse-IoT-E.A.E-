const repo = require('../repositories/sensor.repository');

exports.cadastrar = async (dados) => {
  return await repo.cadastrar(dados);
};

exports.listar = async () => {
  return await repo.listar();
};

exports.ultimo = async () => {
  return await repo.ultimo();
};