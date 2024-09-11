'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'usuario'),
      allowNull: false,
      defaultValue: 'usuario'
    }
  }, {});

  Usuario.associate = function(models) {
    // Um usuário pode criar várias trilhas
    Usuario.hasMany(models.Trilha, { foreignKey: 'usuarioId' });

    // Um usuário pode fazer várias avaliações
    Usuario.hasMany(models.Avaliacao, { foreignKey: 'usuarioId' });

    // Muitos para muitos: usuários podem fazer parte de vários grupos
    Usuario.belongsToMany(models.Grupo, { through: 'UsuarioGrupo', foreignKey: 'usuarioId' });
  };

  return Usuario;
};
