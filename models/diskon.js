"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diskon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Diskon.belongsTo(models.Stan, { foreignKey: "id_stan", as: "stan" });
      Diskon.belongsToMany(models.Menu, {
        through: "MenuDiskon",
        foreignKey: "id_diskon",
        as: "menus",
      });
    }
  }
  Diskon.init(
    {
      nama_diskon: DataTypes.STRING,
      persentase_diskon: DataTypes.DOUBLE,
      tanggal_awal: DataTypes.DATE,
      tanggal_akhir: DataTypes.DATE,
      id_stan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Diskon",
    }
  );
  return Diskon;
};
