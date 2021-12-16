'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class line_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      line_item.belongsTo(models.talent);
      line_item.belongsTo(models.cart);
      line_item.belongsTo(models.order);
    }
  };
  line_item.init({
    days: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "days must not be empty",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "status must not be empty",
        },
      },
    },
    talentId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "talent_id must not be empty",
        },
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "cart_id must not be empty",
        },
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
    beforeCreate: function (line_item, options) {
      line_item.orderId = 0;
    },
  },
    sequelize,
    modelName: 'line_item',
  });
  return line_item;
};