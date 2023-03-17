
'use strict';
let User = (Sequelize, DataTypes) => {

    // sequelize객체.define(테이블 이름, 컬럼 정의, 옵션 정의)
    const model = Sequelize.define(
        'User',
        {
            id : {
                // int
                type: DataTypes.INTEGER,
                // not null
                allowNull: false,
                // primary key
                primaryKey: true,
                // auto_increment
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
            }
        },
        {
            // true로 지정하게 되면 등록된 시간과 수정된 시간을 갖는 컬럼이 만들어진다
            timestamps: true,
            tableName: 'User',
            // sequelize에서 자동으로 table이름 뒤에 s를 붙이는데 freezeTableName 속성을 true로 주면 테이블 이름을 바꾸지 않는다.
            freezeTableName: true
        }
    );
    return model;
}

module.exports = User;