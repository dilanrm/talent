'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.user);
      order.hasMany(models.line_item);
    }
  };
  order.init({
    enddate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          message: "enddate must not be empty",
        },
      },
    },
    startdate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          message: "startdate must not be empty",
        },
      },
    },
    tax: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "tax must not be empty",
        },
      },
    },
    discount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "discount must not be empty",
        },
      },
    },
    total_due: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "total_due must not be empty",
        },
      },
    },
    total_days: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "total_days must not be empty",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "description must not be empty",
        },
      },
    },
    payt_trx_num: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "payt_trx_num must not be empty",
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "city must not be empty",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "address must not be empty",
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
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "user_id must not be empty",
        },
      },
    }
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};