'use strict';

const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let talents = JSON.parse(fs.readFileSync("./talents.json", "utf8"));
     talents = talents.map((talent) => {
      let {
        fullname,
        age,
        birth,
        personality,
        skills,
        price,
        gender,
        nationality,
        userId,
      } = talent;

      return {
        fullname,
        age,
        birth,
        personality,
        skills,
        price,
        gender,
        nationality,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("talents", talents, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("talents", null, {});
  }
};
