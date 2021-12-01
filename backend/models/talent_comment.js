'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class talent_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      talent_comment.belongsTo(models.talent);
      talent_comment.belongsTo(models.user);
    }
  };
  talent_comment.init({
    comment: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "commment must not be empty",
        },
      },
    },
    rating: {
      type: DataTypes.INTEGER
    },
    talentId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "talent_id must not be empty",
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
    hooks: {
      beforeCreate: function (talent_comment, options) {
        talent_comment.rating = 0;
      }
    },
    sequelize,
    modelName: 'talent_comment',
  });
  return talent_comment;
};