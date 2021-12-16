'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user);
    }
  };
  message.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "name must not be empty",
        },
      },
    },
    subject: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "subject must not be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "email must not be empty",
        },
        isEmail: {
          message: "Must email format"
        }
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "phone must not be empty",
        },
      },
    },
    message: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "message must not be empty",
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
    modelName: 'message',
  });
  return message;
};