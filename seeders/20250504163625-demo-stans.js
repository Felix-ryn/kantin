'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stans', [
      {
        nama_stan: 'Stan Sate',
        nama_pemilik: 'Budi',
        telp: '0811111111',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stans', null, {});
  }
};
