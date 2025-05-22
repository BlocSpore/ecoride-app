'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Covoiturages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_depart: {
        type: Sequelize.DATE
      },
      heure_depart: {
        type: Sequelize.DATE
      },
      lieu_depart: {
        type: Sequelize.STRING
      },
      date_arrivee: {
        type: Sequelize.DATE
      },
      heure_arrivee: {
        type: Sequelize.DATE
      },
      lieu_arrivee: {
        type: Sequelize.STRING
      },
      statut: {
        type: Sequelize.STRING
      },
      nb_place: {
        type: Sequelize.INTEGER
      },
      prix_personne: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Covoiturages');
  }
};