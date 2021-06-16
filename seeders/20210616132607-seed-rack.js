'use strict';
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./database/racks.json', {encoding: 'utf-8'}))
data = data.map(rack => {
  return {
    ...rack,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Racks', data, {})
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Racks_id_seq"', (SELECT MAX(id) FROM "Racks"))`
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
    await queryInterface.bulkDelete('Racks')
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Racks_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
