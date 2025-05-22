'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Un rôle appartient à plusieurs utilisateurs
      models.Role.belongsToMany(models.Utilisateur, {
        through: 'UtilisateurRole',
        foreignKey: 'role_id',
        as: 'utilisateurs'
      });
    }
  }
  Role.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
