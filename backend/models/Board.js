'use strict';
const { Model } = require('sequelize');

class Board extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'writer', as: 'writer' });
  }
}

module.exports = (sequelize, DataTypes) => {
  Board.init(
    {
      writer: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      privacy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Board',
      timestamps: true,
      tableName: 'Board',
      freezeTableName: true
    }
  );

  return Board;
};
