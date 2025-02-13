'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailTransaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Detail transaksi milik satu transaksi
      DetailTransaksi.belongsTo(models.Transaksi, { foreignKey: 'id_transaksi' });
      // Detail transaksi memiliki satu menu
      DetailTransaksi.belongsTo(models.Menu, { foreignKey: 'id_menu' });
    }
  }
  DetailTransaksi.init({
    id_transaksi: DataTypes.INTEGER,
    id_menu: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    harga_beli: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'DetailTransaksi',
  });
  return DetailTransaksi;
};