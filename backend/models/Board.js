
'use strict';
let Board = (Sequelize, DataTypes) => {

    // sequelize객체.define(테이블 이름, 컬럼 정의, 옵션 정의)
    const model = Sequelize.define(
        'Board',
        {
            writer : {
                type: DataTypes.INTEGER, // Assuming User table has an id column as primary key
                allowNull: false,
                references: {
                model: 'User', // Assuming your User table is named 'Users'
                key: 'id'
                }
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
            // true로 지정하게 되면 등록된 시간과 수정된 시간을 갖는 컬럼이 만들어진다
            timestamps: true,
            tableName: 'Board',
            // sequelize에서 자동으로 table이름 뒤에 s를 붙이는데 freezeTableName 속성을 true로 주면 테이블 이름을 바꾸지 않는다.
            freezeTableName: true
        }
    );


    return model;
}






module.exports = Board;