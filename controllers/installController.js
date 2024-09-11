const { Usuario, Grupo, Trilha, Avaliacao } = require('../models');

exports.installDatabase = async (req, res) => {
  try {
    // Criação das tabelas
    await Usuario.sync({ force: true });
    await Grupo.sync({ force: true });
    await Trilha.sync({ force: true });
    await Avaliacao.sync({ force: true });

    // Inserção de dados iniciais
    await Usuario.bulkCreate([
      { nome: 'Usuario 1', username: 'usuario1@example.com', senha: 'senha123', role: 'admin' },
      { nome: 'Usuario 2', username: 'usuario2@example.com', senha: 'senha123', role: 'usuario' },
      { nome: 'Usuario 3', username: 'usuario3@example.com', senha: 'senha123', role: 'usuario' },
      { nome: 'Usuario 4', username: 'usuario4@example.com', senha: 'senha123', role: 'usuario' },
      { nome: 'Usuario 5', username: 'usuario5@example.com', senha: 'senha123', role: 'usuario' }
    ]);

    await Grupo.bulkCreate([
      { nome: 'Grupo 1', descricao: 'Descrição do Grupo 1' },
      { nome: 'Grupo 2', descricao: 'Descrição do Grupo 2' },
      { nome: 'Grupo 3', descricao: 'Descrição do Grupo 3' },
      { nome: 'Grupo 4', descricao: 'Descrição do Grupo 4' },
      { nome: 'Grupo 5', descricao: 'Descrição do Grupo 5' }
    ]);

    await Trilha.bulkCreate([
      { nome: 'Trilha 1', descricao: 'Descrição da Trilha 1' },
      { nome: 'Trilha 2', descricao: 'Descrição da Trilha 2' },
      { nome: 'Trilha 3', descricao: 'Descrição da Trilha 3' },
      { nome: 'Trilha 4', descricao: 'Descrição da Trilha 4' },
      { nome: 'Trilha 5', descricao: 'Descrição da Trilha 5' }
    ]);

    await Avaliacao.bulkCreate([
      { nota: 5, comentario: 'Ótima trilha!', trilhaId: 1, usuarioId: 1 },
      { nota: 4, comentario: 'Boa trilha, mas poderia ser melhor.', trilhaId: 2, usuarioId: 2 },
      { nota: 3, comentario: 'Trilha média.', trilhaId: 3, usuarioId: 3 },
      { nota: 2, comentario: 'Não gostei muito.', trilhaId: 4, usuarioId: 4 },
      { nota: 1, comentario: 'Péssima trilha.', trilhaId: 5, usuarioId: 5 }
    ]);

    res.status(200).json({ message: 'Banco de dados instalado e populado com sucesso! =D' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao instalar o banco de dados', details: err.message });
  }
};
