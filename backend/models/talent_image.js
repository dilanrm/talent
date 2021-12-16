'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talent_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      talent_image.belongsTo(models.talent);
    }
  };
  talent_image.init({
    filename: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "filename must not be empty",
        },
      },
    },
    filesize: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "filesize must not be empty",
        },
      },
    },
    file_type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "file_type must not be empty",
        },
      },
    },
    primary: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          message: "primary must not be empty",
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
    }
  }, {
    sequelize,
    modelName: 'talent_image',
  });
  return talent_image;
};