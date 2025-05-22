'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parametre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}

  }
  Parametre.init({
    propriete: DataTypes.STRING,
    valeur: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parametre',
  });
  return Parametre;
};