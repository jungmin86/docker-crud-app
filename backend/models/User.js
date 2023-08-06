'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');

class User extends Model {
  static associate(models) {
    this.hasMany(models.Board, { foreignKey: 'writer', as: 'boards' });
  }

  comparePassword(plainPassword, hashedPassword, salt) {
    let hashPassword = crypto.createHash('sha512').update(plainPassword + salt).digest('hex');
    return hashPassword === hashedPassword;
  }

  generateToken(user) {
    const token = jwt.sign(
      {
        id: user.dataValues.id
      },
      'secretToken',
      {
        expiresIn: '1h'
      }
    );
    const oneHour = moment().add(1, 'hour').valueOf();

    return {
      token: token,
      tokenEXP: oneHour
    };
  }

}

module.exports = (sequelize, DataTypes) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      salt: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
      },
      tokenEXP: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      tableName: 'User',
      freezeTableName: true
    }
  );

  return User;
};
