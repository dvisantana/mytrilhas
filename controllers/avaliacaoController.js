const { Avaliacao, Trilha, Usuario } = require('../models');

// Criar uma avaliação para uma trilha
exports.addAvaliacao = async (req, res) => {
  try {
    const { nota, comentario, trilhaId } = req.body;
    const usuarioId = req.userId; // Pega o ID do usuário autenticado

    // Verifica se a trilha existe
    const trilha = await Trilha.findByPk(trilhaId);
    if (!trilha) {
      return res.status(404).json({ error: 'Trilha não encontrada.' });
    }

    // Cria a avaliação
    const avaliacao = await Avaliacao.create({ nota, comentario, trilhaId, usuarioId });
    res.status(201).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar avaliação.', details: err.message });
  }
};

// Obter todas as avaliações para uma trilha específica
exports.getAvaliacoesByTrilha = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se a trilha existe
    const trilha = await Trilha.findByPk(id);
    if (!trilha) {
      return res.status(404).json({ error: 'Trilha não encontrada.' });
    }

    // Busca as avaliações da trilha
    const avaliacoes = await Avaliacao.findAll({ where: { trilhaId: id } });
    res.status(200).json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliações.', details: err.message });
  }
};

// Obter uma avaliação específica
exports.getAvaliacaoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a avaliação pelo ID
    const avaliacao = await Avaliacao.findByPk(id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    res.status(200).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar avaliação.', details: err.message });
  }
};

// Atualizar uma avaliação
exports.updateAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentario } = req.body;
    const usuarioId = req.usuario.id; // Pega o ID do usuário autenticado

    // Verifica se a avaliação existe e pertence ao usuário autenticado
    const avaliacao = await Avaliacao.findOne({ where: { id, usuarioId } });
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada ou você não tem permissão.' });
    }

    // Atualiza a avaliação
    avaliacao.nota = nota || avaliacao.nota;
    avaliacao.comentario = comentario || avaliacao.comentario;
    await avaliacao.save();

    res.status(200).json(avaliacao);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar avaliação.', details: err.message });
  }
};

// Excluir uma avaliação
exports.deleteAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id; // Pega o ID do usuário autenticado

    // Verifica se a avaliação existe e pertence ao usuário autenticado
    const avaliacao = await Avaliacao.findOne({ where: { id, usuarioId } });
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada ou você não tem permissão.' });
    }

    // Exclui a avaliação
    await avaliacao.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir avaliação.', details: err.message });
  }
};
