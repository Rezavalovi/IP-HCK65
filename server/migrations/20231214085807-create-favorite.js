'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avatarUrl: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.TEXT
      },
      canonicalBaseUrl: {
        type: Sequelize.TEXT
      },
      channelId: {
        type: Sequelize.TEXT
      },
      titleChannel: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnailUrl: {
        type: Sequelize.TEXT
      },
      views: {
        type: Sequelize.INTEGER
      },
      videoId: {
        type: Sequelize.TEXT
      },
      titleVideo: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Favorites');
  }
};