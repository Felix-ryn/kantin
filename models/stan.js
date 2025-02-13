'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Stan memiliki banyak menu
      Stan.hasMany(models.Menu, { foreignKey: 'id_stan' });
      // Stan memiliki banyak transaksi
      Stan.hasMany(models.Transaksi, { foreignKey: 'id_stan' });
    }
  }
  Stan.init({
    nama_stan: DataTypes.STRING,
    nama_pemilik: DataTypes.STRING,
    telp: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stan',
  });
  return Stan;
};