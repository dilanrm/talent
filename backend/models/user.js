"use strict"

const { Model } = require("sequelize");
const {encryptPwd} =  require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.talent);
      user.hasMany(models.talent_comment);
      user.hasMany(models.order);
      user.hasMany(models.cart);
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "fullname must not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Email must be not empty",
          },
          isEmail: {
            message: "Must email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "password must not be empty",
          },
        },
      },
      birthdate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            message: "birthdate must not be empty",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "gender must not be empty",
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "type must not be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = encryptPwd(user.password);
          user.avatar = "http://via.placeholder.com/150";
        },
        beforeUpdate: function (user, options) {
          user.password = encryptPwd(user.password);
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
