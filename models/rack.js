"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rack.hasMany(models.Book, {
        foreignKey: "rack_id",
      });
    }
  }
  Rack.init(
    {
      number: DataTypes.INTEGER,
      row: DataTypes.INTEGER,
      floor_building: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rack",
    }
  );
  return Rack;
};
