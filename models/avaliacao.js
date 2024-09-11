'use strict';

module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define('Avaliacao', {
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }  // Avaliação de 1 a 5 estrelas
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  Avaliacao.associate = function(models) {
    // Uma avaliação é feita por um usuário
    Avaliacao.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });

    // Uma avaliação está associada a uma trilha
    Avaliacao.belongsTo(models.Trilha, { foreignKey: 'trilhaId' });
  };

  return Avaliacao;
};
