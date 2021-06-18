'use strict';
const fs = require('fs');
const bcrypt = require("bcrypt")

const salt = bcrypt.genSaltSync(10);
let data = JSON.parse(fs.readFileSync('./database/users.json', {encoding: 'utf-8'}))
data = data.map(user => {
  return {
    email: user.email,
    password: bcrypt.hashSync(user.password, salt),
    role_id: user.role_id,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data, {})
    await queryInterface.sequelize.query(
      `SELECT SETVAL('"Users_id_seq"', (SELECT MAX(id) FROM "Users"))`
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
    await queryInterface.bulkDelete('Users')
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Users_id_seq" RESTART`
    );
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
