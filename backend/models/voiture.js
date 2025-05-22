'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voiture extends Model {
    static associate(models) {
      // Propriétaire (utilisateur)
      models.Voiture.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'proprietaire'
      });
      // Marque
      models.Voiture.belongsTo(models.Marque, {
        foreignKey: 'marque_id',
        as: 'marque'
      });
    }
  }
  Voiture.init({
    modele: DataTypes.STRING,
    plaque_immatriculation: DataTypes.STRING,
    couleur: DataTypes.STRING,
    annee: DataTypes.INTEGER,
    utilisateur_id: DataTypes.INTEGER,
    marque_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voiture',
  });
  return Voiture;
};
