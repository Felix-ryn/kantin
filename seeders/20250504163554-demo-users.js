// seeders/[timestamp]-demo-users.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'adminstan1',
        password: 'hashedpassword1', // gunakan bcrypt saat produksi
        role: 'admin_stan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'siswa1',
        password: 'hashedpassword2',
        role: 'siswa',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
