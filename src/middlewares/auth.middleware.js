const jwt = require('jsonwebtoken');

const SECRET = 'segredo_super_forte';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não enviado ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    req.usuario = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};