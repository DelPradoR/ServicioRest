'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      materia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      claveDMateria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      grupo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      creditos: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cursos');
  }
};
