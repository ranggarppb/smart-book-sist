'use strict';

const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./database/reviews.json', {encoding: 'utf-8'}))
data = data.map(review => {
  return {
    ...review,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', data, {})
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Reviews_id_seq"', (SELECT MAX(id) FROM "Reviews"))`
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews')
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Reviews_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
