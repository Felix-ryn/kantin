'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('siswas', [
      {
        nama_siswa: 'Felix Ryan',
        alamat: 'Jl. Contoh No.1',
        telp: '08123456789',
        id_user: 2,
        foto: 'foto1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('siswas', null, {});
  }
};
