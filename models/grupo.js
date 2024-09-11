'use strict';

module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define('Grupo', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  Grupo.associate = function(models) {
    // Muitos para muitos: grupos podem ter vários usuários
    Grupo.belongsToMany(models.Usuario, { through: 'UsuarioGrupo', foreignKey: 'grupoId' });

    // Muitos para muitos: grupos podem ter várias trilhas
    Grupo.belongsToMany(models.Trilha, { through: 'TrilhaGrupo', foreignKey: 'grupoId' });
  };

  return Grupo;
};
