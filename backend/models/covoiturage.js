'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Covoiturage extends Model {
    static associate(models) {
      // Participants au covoiturage
      models.Covoiturage.belongsToMany(models.Utilisateur, {
        through: 'UtilisateurCovoiturage',
        foreignKey: 'covoiturage_id',
        as: 'participants'
      });
      // Avis sur ce covoiturage
      models.Covoiturage.hasMany(models.Avis, {
        foreignKey: 'covoiturage_id',
        as: 'avis'
      });
    }
  }
  Covoiturage.init({
    lieu_depart: DataTypes.STRING,
    lieu_arrivee: DataTypes.STRING,
    date_depart: DataTypes.DATE,
    date_arrivee: DataTypes.DATE,
    prix: DataTypes.FLOAT,
    places: DataTypes.INTEGER,
    statut: DataTypes.STRING,
    conducteur_id: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Covoiturage',
  });
  return Covoiturage;
};
