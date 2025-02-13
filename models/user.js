'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User bisa memiliki banyak transaksi
      User.hasMany(models.Transaksi, { foreignKey: 'id_siswa' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin_stan', 'siswa')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};