'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('detailtransaksis', [
      {
        id_transaksi: 7,
        id_menu: 11,
        qty: 2,
        harga_beli: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_transaksi: 8,
        id_menu: 12,
        qty: 1,
        harga_beli: 8000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_transaksi: 8,
        id_menu: 13,
        qty: 3,
        harga_beli: 12000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('detailtransaksis', null, {});
  }
};
