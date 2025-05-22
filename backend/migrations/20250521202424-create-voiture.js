'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Voitures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modele: {
        type: Sequelize.STRING
      },
      immatriculation: {
        type: Sequelize.STRING
      },
      energie: {
        type: Sequelize.STRING
      },
      couleur: {
        type: Sequelize.STRING
      },
      date_premiere_immatriculation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Voitures');
  }
};