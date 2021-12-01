"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user);
      cart.hasMany(models.line_item);
    }
  }
  cart.init(
    {
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "status must not be empty",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "user_id must not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
