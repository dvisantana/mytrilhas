'use strict';

module.exports = (sequelize, DataTypes) => {
  const Trilha = sequelize.define('Trilha', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('Banho', 'Caminhada', 'Moto', 'Bicicleta'),
        allowNull: false
    },
    dificuldade: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Trilha.associate = function(models) {
    // Uma trilha é criada por um usuário
    Trilha.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'criador' });

    // Uma trilha pode ter várias avaliações
    Trilha.hasMany(models.Avaliacao, { foreignKey: 'trilhaId' });

    // Muitos para muitos: trilhas podem pertencer a vários grupos
    Trilha.belongsToMany(models.Grupo, { through: 'TrilhaGrupo', foreignKey: 'trilhaId' });
  };
  
  return Trilha;
};
