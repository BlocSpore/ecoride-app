'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UtilisateurRole extends Model {
    static associate(models) {}
  }
  UtilisateurRole.init({
    utilisateur_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UtilisateurRole',
    timestamps: false
  });
  return UtilisateurRole;
};
