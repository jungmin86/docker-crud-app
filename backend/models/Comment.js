'use strict';
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'writer', as: 'user' });
    this.belongsTo(models.Board, { foreignKey: 'postId', as: 'board' });
    this.belongsTo(models.User, { foreignKey: 'responseTo', as: 'respondedToUser' });
  }
}

module.exports = (sequelize) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      timestamps: true,
      tableName: 'Comment',
      freezeTableName: true,
    }
  );

  return Comment;
};
