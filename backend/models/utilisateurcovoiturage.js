'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UtilisateurCovoiturage extends Model {
    static associate(models) {}
  }
  UtilisateurCovoiturage.init({
    utilisateur_id: DataTypes.INTEGER,
    covoiturage_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UtilisateurCovoiturage',
    timestamps: false
  });
  return UtilisateurCovoiturage;
};
