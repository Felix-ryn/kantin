'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transaksis', [
      {
        tanggal: new Date('2025-05-01 10:30:00'),
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        id_siswa: 8, // Pastikan ini sesuai dengan ID siswa yang ada di tabel 'siswas'
        status: 'belum dikonfirmasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal: new Date('2025-05-02 11:00:00'),
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        id_siswa: 8, // Pastikan ini sesuai dengan ID siswa yang ada di tabel 'siswas'
        status: 'dimasak',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal: new Date('2025-05-03 12:15:00'),
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        id_siswa: 8, // Pastikan ini sesuai dengan ID siswa yang ada di tabel 'siswas'
        status: 'diantar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal: new Date('2025-05-04 13:45:00'),
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        id_siswa: 8, // Pastikan ini sesuai dengan ID siswa yang ada di tabel 'siswas'
        status: 'sampai',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transaksis', null, {});
  }
};
