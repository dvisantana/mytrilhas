const bcrypt = require('bcrypt');
const { Usuario, Trilha, Avaliacao } = require('../models');

exports.installDatabase = async (req, res) => {
  try {
    const hash = await bcrypt.hash('senha123', 10);
    // Criação das tabelas
    await Usuario.sync({ force: true });
    await Trilha.sync({ force: true });
    await Avaliacao.sync({ force: true });

    // Inserção de dados iniciais
    await Usuario.bulkCreate([
      { nome: 'admin', username: 'admin', senha: hash, tipo: 'admin' },
      { nome: 'Usuario 2', username: 'user2', senha: hash, tipo: 'usuario' },
      { nome: 'Usuario 3', username: 'user3', senha: hash, tipo: 'usuario' },
      { nome: 'Usuario 4', username: 'user4', senha: hash, tipo: 'usuario' },
      { nome: 'Usuario 5', username: 'user5', senha: hash, tipo: 'usuario' }
    ]);

    await Trilha.bulkCreate([
      { nome: 'Cachoeira Marabá', local: 'Congoinhas', tipo: 'Banho', dificuldade: 'Fácil' },
      { nome: 'Cachoeira Marabá', local: 'Congoinhas', tipo: 'Banho', dificuldade: 'Fácil' },
      { nome: 'Cachoeira Marabá', local: 'Congoinhas', tipo: 'Banho', dificuldade: 'Fácil' },
      { nome: 'Cachoeira Marabá', local: 'Congoinhas', tipo: 'Banho', dificuldade: 'Fácil' },
      { nome: 'Cachoeira Marabá', local: 'Congoinhas', tipo: 'Banho', dificuldade: 'Fácil' }
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
