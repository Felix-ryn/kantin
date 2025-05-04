'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('diskons', [
      {
        nama_diskon: 'Diskon 10%',
        persentase_diskon: 10.0,
        tanggal_awal: new Date('2025-05-01'),
        tanggal_akhir: new Date('2025-05-10'),
        id_stan: 1, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_diskon: 'Diskon 20%',
        persentase_diskon: 20.0,
        tanggal_awal: new Date('2025-06-01'),
        tanggal_akhir: new Date('2025-06-10'),
        id_stan: 2, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('diskons', null, {});
  }
};
