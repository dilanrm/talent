'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      talent.hasMany(models.talent_image);
      talent.hasMany(models.talent_comment);
      talent.hasMany(models.talent_social);
      talent.hasMany(models.line_item);
      talent.belongsTo(models.user);
    }
  };
  talent.init({
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "fullname must not be empty",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "age must not be empty",
        },
      },
    },
    personality: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "personality must not be empty",
        },
      },
    },
    birth: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          message: "birth must not be empty",
        },
      },
    },
    skills: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "skills must not be empty",
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "price must not be empty",
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
    nationality: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "user_id must not be empty",
        },
      },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "height must not be empty",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'talent',
  });
  return talent;
};