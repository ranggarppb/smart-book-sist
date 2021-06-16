'use strict';

const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./database/roles.json', {encoding: 'utf-8'}))
data = data.map(roles => {
  return {
    ...roles,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', data, {})
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Roles_id_seq"', (SELECT MAX(id) FROM "Roles"))`
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
    await queryInterface.bulkDelete('Roles')
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Roles_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
