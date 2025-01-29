'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuDiskon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuDiskon.init({
    id_menu: DataTypes.INTEGER,
    id_diskon: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MenuDiskon',
  });
  return MenuDiskon;
};