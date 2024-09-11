const { Trilha, Avaliacao } = require('../models');

// Criar uma nova trilha
exports.createTrilha = async (req, res) => {
  try {
    const { nome, local, tipo, dificuldade } = req.body;
    const usuarioId = req.userId;
    const trilha = await Trilha.create({ nome, local, tipo, dificuldade, usuarioId });
    res.status(201).json(trilha);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar trilha', details: err.message });
  }
};

// Obter todas as trilhas
exports.getTrilhas = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Valor padrão 10
    const page = parseInt(req.query.page) || 1; // Valor padrão 1

    if (![5, 10, 30].includes(limit)) {
      return res.status(400).json({ error: 'Limite deve ser 5, 10 ou 30.' });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Trilha.findAndCountAll({
      limit,
      offset
    });

    res.status(200).json({ trilhas: rows, total: count });
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

// Obter uma trilha e suas avaliações
exports.getTrilhaWithAvaliacoes = async (req, res) => {
  try {
    const { id } = req.params;

    // Procurar a trilha pelo ID e incluir as avaliações relacionadas
    const trilha = await Trilha.findOne({
      where: { id: id },
      include: [
        {
          model: Avaliacao,
          as: 'avaliacoes', // Alias que corresponde ao modelo Avaliacao
          attributes: ['nota', 'comentario'] // Especifique os atributos a serem retornados
        }
      ]
    });

    // Verificar se a trilha foi encontrada
    if (!trilha) {
      return res.status(404).json({ error: 'Trilha não encontrada' });
    }

    // Retornar a trilha com suas avaliações
    res.status(200).json(trilha);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar trilha e avaliações', details: err.message });
  }
};