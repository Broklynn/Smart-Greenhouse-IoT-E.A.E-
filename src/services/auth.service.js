const repo = require('../repositories/auth.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'segredo_super_forte'; // depois coloca em .env

exports.cadastrar = async (dados) => {
  const existente = await repo.buscarUsuario(dados.usuario);

  if (existente) {
    throw new Error('Usuário já existe');
  }

  const senhaHash = await bcrypt.hash(dados.senha, 10);

  await repo.criarUsuario({
    ...dados,
    senha: senhaHash
  });

  return { mensagem: 'Usuário cadastrado com sucesso' };
};

exports.login = async (login, senha) => {
  const usuario = await repo.buscarUsuario(login);

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome
    },
    SECRET,
    { expiresIn: '1h' }
  );

  return {
    mensagem: 'Login ok',
    usuario: usuario.nome,
    token
  };
};