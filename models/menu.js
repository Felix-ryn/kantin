'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Menu bisa masuk ke banyak detail transaksi
      Menu.hasMany(models.DetailTransaksi, { foreignKey: 'id_menu' });
    }
  }
  Menu.init({
    nama_makanan: DataTypes.STRING,
    harga: DataTypes.DOUBLE,
    jenis: DataTypes.ENUM('makanan', 'minuman'),
    foto: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    id_stan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};