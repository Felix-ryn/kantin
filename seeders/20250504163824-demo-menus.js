'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('menus', [
      {
        nama_makanan: 'Nasi Goreng',
        harga: 15000.00,
        jenis: 'makanan',
        foto: 'nasi_goreng.jpg',
        deskripsi: 'Nasi goreng dengan telur dan ayam.',
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_makanan: 'Es Teh Manis',
        harga: 5000.00,
        jenis: 'minuman',
        foto: 'es_teh_manis.jpg',
        deskripsi: 'Es teh manis segar.',
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_makanan: 'Pizza Margherita',
        harga: 45000.00,
        jenis: 'makanan',
        foto: 'pizza_margherita.jpg',
        deskripsi: 'Pizza dengan keju dan tomat.',
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama_makanan: 'Jus Jeruk',
        harga: 7000.00,
        jenis: 'minuman',
        foto: 'jus_jeruk.jpg',
        deskripsi: 'Jus jeruk segar alami.',
        id_stan: 5, // Pastikan ini sesuai dengan ID stan yang ada di tabel 'stans'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menus', null, {});
  }
};
