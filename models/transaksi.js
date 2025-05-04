'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Transaksi dimiliki oleh satu Siswa
      Transaksi.belongsTo(models.Siswa, { foreignKey: 'id_siswa' });

      // Transaksi dilakukan di satu Stan
      Transaksi.belongsTo(models.Stan, { foreignKey: 'id_stan' });

      // Transaksi memiliki banyak detail transaksi
      Transaksi.hasMany(models.DetailTransaksi, {
        foreignKey: 'id_transaksi',
        as: 'detail_transaksis'
      });
    }
  }

  Transaksi.init({
    tanggal: DataTypes.DATE,
    id_stan: DataTypes.INTEGER,
    id_siswa: DataTypes.INTEGER,
    status: DataTypes.ENUM('belum dikonfirmasi', 'dimasak', 'diantar', 'sampai')
  }, {
    sequelize,
    modelName: 'Transaksi',
  });

  return Transaksi;
};
