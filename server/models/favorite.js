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
    avatarUrl: DataTypes.TEXT,
    type: DataTypes.TEXT,
    canonicalBaseUrl: DataTypes.TEXT,
    channelId: DataTypes.TEXT,
    titleChannel: DataTypes.TEXT,
    description: DataTypes.TEXT,
    thumbnailUrl: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    videoId: DataTypes.TEXT,
    titleVideo: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};