'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      // Roles
      models.Utilisateur.belongsToMany(models.Role, {
        through: 'UtilisateurRole',
        foreignKey: 'utilisateur_id',
        as: 'roles'
      });
      // Voitures
      models.Utilisateur.hasMany(models.Voiture, {
        foreignKey: 'utilisateur_id',
        as: 'voitures'
      });
      // Avis rédigés
      models.Utilisateur.hasMany(models.Avis, {
        foreignKey: 'utilisateur_id',
        as: 'avisRediges'
      });
      // Covoiturages (participant)
      models.Utilisateur.belongsToMany(models.Covoiturage, {
        through: 'UtilisateurCovoiturage',
        foreignKey: 'utilisateur_id',
        as: 'covoiturages'
      });
    }
  }
  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.STRING,
    adresse: DataTypes.STRING,
    date_naissance: DataTypes.STRING,
    photo: DataTypes.BLOB,
    pseudo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};
