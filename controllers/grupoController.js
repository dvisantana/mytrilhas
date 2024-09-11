const { Grupo, Usuario, Trilha } = require('../models');

// Criar um novo grupo
exports.createGrupo = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    // Cria o grupo
    const grupo = await Grupo.create({ nome, descricao });

    res.status(201).json(grupo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar grupo', details: err.message });
  }
};

// Listar todos os grupos
exports.getGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.findAll();
    res.status(200).json(grupos);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao listar grupos', details: err.message });
  }
};

// Obter detalhes de um grupo específico
exports.getGrupoById = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupo.findByPk(id, {
      include: [
        { model: Usuario, as: 'usuarios' }, // Associe usuários ao grupo
        { model: Trilha, as: 'trilhas' }   // Associe trilhas ao grupo
      ]
    });

    if (!grupo) return res.status(404).json({ error: 'Grupo não encontrado.' });

    res.status(200).json(grupo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao obter grupo', details: err.message });
  }
};

// Atualizar um grupo
exports.updateGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const grupo = await Grupo.findByPk(id);
    if (!grupo) return res.status(404).json({ error: 'Grupo não encontrado.' });

    // Atualiza o grupo
    grupo.nome = nome || grupo.nome;
    grupo.descricao = descricao || grupo.descricao;
    await grupo.save();

    res.status(200).json(grupo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar grupo', details: err.message });
  }
};

// Excluir um grupo
exports.deleteGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupo.findByPk(id);
    if (!grupo) return res.status(404).json({ error: 'Grupo não encontrado.' });

    // Remove o grupo
    await grupo.destroy();

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Erro ao excluir grupo', details: err.message });
  }
};

// Adicionar um usuário ao grupo
exports.addUsuarioToGrupo = async (req, res) => {
  try {
    const { idGrupo, idUsuario } = req.body;

    const grupo = await Grupo.findByPk(idGrupo);
    const usuario = await Usuario.findByPk(idUsuario);

    if (!grupo || !usuario) return res.status(404).json({ error: 'Grupo ou usuário não encontrado.' });

    // Associa o usuário ao grupo
    await grupo.addUsuario(usuario);

    res.status(200).json({ message: 'Usuário adicionado ao grupo com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar usuário ao grupo', details: err.message });
  }
};

// Remover um usuário do grupo
exports.removeUsuarioFromGrupo = async (req, res) => {
  try {
    const { idGrupo, idUsuario } = req.body;

    const grupo = await Grupo.findByPk(idGrupo);
    const usuario = await Usuario.findByPk(idUsuario);

    if (!grupo || !usuario) return res.status(404).json({ error: 'Grupo ou usuário não encontrado.' });

    // Remove a associação do usuário com o grupo
    await grupo.removeUsuario(usuario);

    res.status(200).json({ message: 'Usuário removido do grupo com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao remover usuário do grupo', details: err.message });
  }
};

// Adicionar uma trilha ao grupo
exports.addTrilhaToGrupo = async (req, res) => {
  try {
    const { idGrupo, idTrilha } = req.body;

    const grupo = await Grupo.findByPk(idGrupo);
    const trilha = await Trilha.findByPk(idTrilha);

    if (!grupo || !trilha) return res.status(404).json({ error: 'Grupo ou trilha não encontrado.' });

    // Associa a trilha ao grupo
    await grupo.addTrilha(trilha);

    res.status(200).json({ message: 'Trilha adicionada ao grupo com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar trilha ao grupo', details: err.message });
  }
};

// Remover uma trilha do grupo
exports.removeTrilhaFromGrupo = async (req, res) => {
  try {
    const { idGrupo, idTrilha } = req.body;

    const grupo = await Grupo.findByPk(idGrupo);
    const trilha = await Trilha.findByPk(idTrilha);

    if (!grupo || !trilha) return res.status(404).json({ error: 'Grupo ou trilha não encontrado.' });

    // Remove a associação da trilha com o grupo
    await grupo.removeTrilha(trilha);

    res.status(200).json({ message: 'Trilha removida do grupo com sucesso.' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao remover trilha do grupo', details: err.message });
  }
};
