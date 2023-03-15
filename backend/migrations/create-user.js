'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('User', {
            id : {
                // int
                type: Sequelize.INTEGER,
                // not null
                allowNull: false,
                // primary key
                primaryKey: true,
                // auto_increment
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(10),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            salt: {
                type: Sequelize.STRING
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('User');
    }
};