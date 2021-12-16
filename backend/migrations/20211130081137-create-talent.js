'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      personality: {
        type: Sequelize.STRING
      },
      birth: {
        type: Sequelize.DATE
      },
      skills: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('talents');
  }
};