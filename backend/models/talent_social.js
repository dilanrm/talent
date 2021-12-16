'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talent_social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      talent_social.belongsTo(models.talent);
    }
  };
  talent_social.init({
    platform: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "platform must not be empty",
        },
      },
    },
    account: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "account must not be empty",
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
    modelName: 'talent_social',
  });
  return talent_social;
};