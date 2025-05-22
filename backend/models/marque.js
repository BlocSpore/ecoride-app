'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marque extends Model {
    static associate(models) {
      // Une marque peut avoir plusieurs voitures
      models.Marque.hasMany(models.Voiture, {
        foreignKey: 'marque_id',
        as: 'voitures'
      });
    }
  }
  Marque.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Marque',
  });
  return Marque;
};
