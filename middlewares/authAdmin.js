const { Usuario } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const usuarioId = req.userId;
    
    // Verifica se o usuário está autenticado e é um administrador
    const usuario = await Usuario.findByPk(usuarioId);
    
    if (!usuario || usuario.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar.' });
    }
    
    next();  // Se for admin, continua para o próximo middleware ou rota
  } catch (err) {
    res.status(500).json({ error: 'Erro ao verificar administrador', details: err.message });
  }
};
