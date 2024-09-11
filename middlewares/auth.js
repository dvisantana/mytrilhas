const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;  // Adiciona o ID do usuário ao request
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};
