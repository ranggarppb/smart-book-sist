"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Rack, {
        foreignKey: "rack_id",
      });
      Book.hasMany(models.Review, {
        foreignKey: "book_id",
      });
    }
    get stockInPiece() {
      return `${this.stock} buah`;
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      category: DataTypes.STRING,
      rack_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  Book.addHook("beforeCreate", (book) => {
    if (!book.rack_id) book.rack_id = 1;
  });
  return Book;
};
