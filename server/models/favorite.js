'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Favorite.belongsTo(models.User, {
        foreignKey : "UserId"
      })
    }
  }
  Favorite.init({
    avatarUrl: DataTypes.STRING,
    type: DataTypes.STRING,
    canonicalBaseUrl: DataTypes.STRING,
    channelId: DataTypes.STRING,
    titelChannel: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnailUrl: DataTypes.STRING,
    views: DataTypes.INTEGER,
    videoId: DataTypes.STRING,
    titleVideo: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};