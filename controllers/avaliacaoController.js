const { Avaliacao } = require('../models');

// Criar uma avaliação para uma trilha
exports.createAvaliacao = async (req, res) => {
  try {
    const { nota, comentario, usuarioId, trilhaId } = req.body;
    const avaliacao = await Avaliacao.create({ nota, comentario, usuarioId, trilhaId });
    res.status(201).json(avaliacao);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar avaliação', details: err.message });
  }
};

// Obter avaliações de uma trilha específica
exports.getAvaliacoesByTrilha = async (req, res) => {
  try {
    const { trilhaId } = req.params;
    const avaliacoes = await Avaliacao.findAll({ where: { trilhaId } });
    res.status(200).json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliações', details: err.message });
  }
};

// Obter todas as avaliações feitas por um usuário
exports.getAvaliacoesByUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const avaliacoes = await Avaliacao.findAll({ where: { usuarioId } });
    res.status(200).json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliações', details: err.message });
  }
};
