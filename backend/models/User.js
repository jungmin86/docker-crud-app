const jwt = require('jsonwebtoken');


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
            },
            token: {
                type: DataTypes.STRING
            },
            tokenEXP: {
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

// User.comparePassword = function(plainPassword){
//     bcrypt.compare(plainPassword, this.password, function(err, isMatch){
//         if (err) return cb(err);
//         cb(null, isMatch)
//     })
// }

// User.generateToken = function() {

//     var user = this;
//     //jsonwebtoken을 이용해서 토큰 생성
//     var token = jwt.sign(user.id.toJSON(),
//         "secretToken",
//         {
//         expiresIn: '10m'
//     });
//     user.token = token;
//     let newObj = {
//         token : user.token
//     };
//     user.update(newObj, {where: {email: user.email}})
//     .then((result) => {
//         console.log( result );
//     })
// }



// User.findByToken = function(token, cb) {
//     var user = this;
//     //토큰  복호화
//     jwt.verify(token, 'secretToken', function(err, decoded) {
//         //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB의 토큰이 일치하는지?
//         user.findOne({where:{"id": decoded, "token": token}}, function(err, user) {
//             if(err) return cb(err);
//             cb(null, user);
//         })
//     })
// }



module.exports = User;