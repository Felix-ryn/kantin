'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Siswa memiliki banyak transaksi
      Siswa.hasMany(models.Transaksi, { foreignKey: 'id_siswa' });
    }
  }
  Siswa.init({
    nama_siswa: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    telp: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Siswa',
  });
  return Siswa;
};