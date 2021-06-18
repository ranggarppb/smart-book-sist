'use strict';
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./database/books.json', {encoding: 'utf-8'}))
data = data.map(book => {
  return {
    ...book,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', data, {})
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Books_id_seq"', (SELECT MAX(id) FROM "Books"))`
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
    await queryInterface.bulkDelete('Books')
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Books_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
