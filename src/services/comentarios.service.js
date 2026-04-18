const repo = require('../repositories/comentarios.repository');

exports.criar = async ({ texto, usuarioId }) => {
  if (!texto || !usuarioId) {
    throw new Error('Dados inválidos');
  }

  await repo.salvar(texto, usuarioId);
};

exports.listar = async () => {
  return await repo.listar();
};