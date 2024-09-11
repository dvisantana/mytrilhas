const { Trilha } = require('../models');

// Criar uma nova trilha
exports.createTrilha = async (req, res) => {
  try {
    const { nome, local, dificuldade, usuarioId } = req.body;
    const trilha = await Trilha.create({ nome, local, dificuldade, usuarioId });
    res.status(201).json(trilha);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar trilha', details: err.message });
  }
};

// Obter todas as trilhas
exports.getTrilhas = async (req, res) => {
  try {
    const trilhas = await Trilha.findAll();
    res.status(200).json(trilhas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar trilhas', details: err.message });
  }
};

// Obter uma trilha por ID
exports.getTrilhaById = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findByPk(id);
    if (!trilha) return res.status(404).json({ error: 'Trilha não encontrada' });
    res.status(200).json(trilha);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar trilha', details: err.message });
  }
};

// Atualizar uma trilha
exports.updateTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, local, dificuldade } = req.body;
    const trilha = await Trilha.findByPk(id);
    if (!trilha) return res.status(404).json({ error: 'Trilha não encontrada' });

    await trilha.update({ nome, local, dificuldade });
    res.status(200).json(trilha);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar trilha', details: err.message });
  }
};

// Excluir uma trilha
exports.deleteTrilha = async (req, res) => {
  try {
    const { id } = req.params;
    const trilha = await Trilha.findByPk(id);
    if (!trilha) return res.status(404).json({ error: 'Trilha não encontrada' });

    await trilha.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar trilha', details: err.message });
  }
};
