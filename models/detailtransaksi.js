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
      // define association here
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