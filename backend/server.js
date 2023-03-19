var express = require('express');
var app = express();
var db = require('./models/index.js');
const bodyParser = require('body-parser');
const { request } = require('http');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


db.sequelize.sync();

app.get('/', function(req, res){
//    db.User.create({
//        firstName: req.body.firstName,
//        lastName: req.body.lastName,
//        email: req.body.email,
//        password: req.body.password,
//        role: 0
//    });
   return res.status(200).json({
    success: true
   })
});

app.use('/api/users', require('./routes/users.js'));

app.listen(5000, function() {
    console.log('Server Running at http://127.0.0.1:');
});