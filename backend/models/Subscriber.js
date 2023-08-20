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
      // 필요한 다른 속성들을 여기에 추가하세요.
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
