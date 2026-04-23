const repo = require('../repositories/comentarios.repository');

function criarErro(message, status) {
  const erro = new Error(message);
  erro.status = status;
  return erro;
}

function validarTexto(texto) {
  const textoTratado = typeof texto === 'string' ? texto.trim() : undefined;

  if (!textoTratado || textoTratado.length > 500) {
    throw criarErro('Comentario invalido', 400);
  }

  return textoTratado;
}

function validarPaginacao(page, limit) {
  const pageNumero = page === undefined ? 1 : Number(page);
  const limitNumero = limit === undefined ? 10 : Number(limit);

  if (!Number.isInteger(pageNumero) || pageNumero < 1) {
    throw criarErro('Paginacao invalida', 400);
  }

  if (!Number.isInteger(limitNumero) || limitNumero < 1 || limitNumero > 50) {
    throw criarErro('Paginacao invalida', 400);
  }

  return {
    page: pageNumero,
    limit: limitNumero,
    offset: (pageNumero - 1) * limitNumero
  };
}

function validarFiltros({ search, usuarioId }) {
  let searchTratado;
  let usuarioIdTratado;

  if (search !== undefined) {
    if (typeof search !== 'string') {
      throw criarErro('Busca invalida', 400);
    }

    searchTratado = search.trim();
  }

  if (usuarioId !== undefined) {
    usuarioIdTratado = Number(usuarioId);

    if (!Number.isInteger(usuarioIdTratado) || usuarioIdTratado < 1) {
      throw criarErro('Filtro de usuario invalido', 400);
    }
  }

  return {
    search: searchTratado,
    usuarioId: usuarioIdTratado
  };
}

function montarRespostaPaginada(paginacao, total, data) {
  return {
    page: paginacao.page,
    limit: paginacao.limit,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / paginacao.limit),
    data
  };
}

async function buscarComentarioDoUsuario(id, usuarioId) {
  const comentario = await repo.buscarPorId(id);

  if (!comentario) {
    throw criarErro('Comentario nao encontrado', 404);
  }

  if (comentario.usuarioId !== usuarioId) {
    throw criarErro('Acesso negado', 403);
  }

  return comentario;
}

exports.criar = async ({ texto, usuarioId }) => {
  const textoTratado = validarTexto(texto);
  await repo.salvar(textoTratado, usuarioId);
};

exports.listar = async ({ page, limit, search, usuarioId } = {}) => {
  const paginacao = validarPaginacao(page, limit);
  const filtros = validarFiltros({ search, usuarioId });
  const resultado = await repo.listar({
    ...paginacao,
    ...filtros
  });

  return montarRespostaPaginada(paginacao, resultado.total, resultado.data);
};

exports.listarDoUsuario = async (usuarioId, { page, limit } = {}) => {
  const paginacao = validarPaginacao(page, limit);
  const resultado = await repo.listar({
    ...paginacao,
    usuarioId
  });

  return montarRespostaPaginada(paginacao, resultado.total, resultado.data);
};

exports.editarComentario = async (id, usuarioId, texto) => {
  const textoTratado = validarTexto(texto);

  await buscarComentarioDoUsuario(id, usuarioId);
  await repo.atualizar(id, textoTratado);
};

exports.deletarComentario = async (id, usuarioId) => {
  await buscarComentarioDoUsuario(id, usuarioId);
  await repo.deletar(id);
};
