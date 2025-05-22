'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avis extends Model {
    static associate(models) {
      // Auteur de l'avis
      models.Avis.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id',
        as: 'auteur'
      });
      // Covoiturage lié à l'avis
      models.Avis.belongsTo(models.Covoiturage, {
        foreignKey: 'covoiturage_id',
        as: 'covoiturage'
      });
    }
  }
  Avis.init({
    commentaire: DataTypes.STRING,
    note: DataTypes.STRING,
    statut: DataTypes.STRING,
    utilisateur_id: DataTypes.INTEGER,
    covoiturage_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Avis',
  });
  return Avis;
};
