const Sequelize = require("sequelize");

// config.json파일의 "development"의 값을 config 변수에 저장해준다
const config = require("../config/config.json")["development"];

// db 객체 생성. 나중에 정보를 넣어줄 것이다.
const db = {};
const sequelize = new Sequelize(
    // 원래 이 부분에 일일이 데이터베이스 정보를 적어줘야 하는데, config에 정보를 저장해주었기 때문에 이렇게 작성할 수 있다.
    config.database,
    config.username,
    config.password,
    config
);



// ./Visitor.js에서 module.exports에 있는 Visitor 함수를 불러오는데 바로 실행시켜서 return된 model이 db.Visitor에 담긴다.
db.User = require("./User.js")(sequelize, Sequelize);
db.Board = require("./Board.js")(sequelize, Sequelize);

db.User.associate(db);
db.Board.associate(db);

// dictionary.key = value -> 이렇게 새로운 키와 값을 넣어준 것이다.
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// 결국 const db = {"sequelize" : sequelize, "Sequelize" : Sequelize}; 이런 형태
// db를 내보내준다.
module.exports = db;