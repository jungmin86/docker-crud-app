// models/Subscriber.js
'use strict';
const { Model } = require('sequelize');

class Subscriber extends Model {
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userTo', as: 'toUser' });
    this.belongsTo(models.User, { foreignKey: 'userFrom', as: 'fromUser' });
  }
}

module.exports = (sequelize, DataTypes) => {
  Subscriber.init(
    {
        userTo: {
            type: DataTypes.INTEGER, 
            allowNull: false,
          },
          userFrom: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    },
    {
      sequelize,
      modelName: 'Subscriber',
      timestamps: true,
      tableName: 'Subscriber', 
      freezeTableName: true,
    }
  );

  return Subscriber;
};
