'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menudiskons', [
      {
        id_diskon: 11,  // Pastikan id_diskon sudah ada di tabel 'diskons'
        id_menu: 11,    // Pastikan id_menu sudah ada di tabel 'menus'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_diskon: 12,  // Pastikan id_diskon sudah ada di tabel 'diskons'
        id_menu: 12,    // Pastikan id_menu sudah ada di tabel 'menus'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menudiskons', null, {});
  }
};
