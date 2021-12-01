'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('talent_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
        type: Sequelize.STRING
      },
      filesize: {
        type: Sequelize.INTEGER
      },
      file_type: {
        type: Sequelize.STRING
      },
      primary: {
        type: Sequelize.BOOLEAN
      },
      talentId: {
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
    await queryInterface.dropTable('talent_images');
  }
};