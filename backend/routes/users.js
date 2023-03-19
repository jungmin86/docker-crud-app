
const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const { auth } = require("../middleware/auth.js");
const jwt = require('jsonwebtoken');


router.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다 -> Authentication이 true
  res.status(200).json( {
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
});


router.post("/register", (req, res, next) => {

    let body = req.body;
    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    models.User.create({
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: hashPassword,
        salt: salt
    })
    .then( response => {
        return res.status(200).json({ success: true, response});
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.get('/login', function(req, res, next) {
    res.render("/login");
});

router.post("/login", (req, res, next) => {
  console.log("로그인 api"); //이건 나옴
  models.User.findOne({
      where: {
          email : req.body.email
      }
  }).then(user => {
    if(!user)  {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
     });
    }

   let dbPassword = user.dataValues.password;
   let inputPassword = req.body.password;
   let salt = user.dataValues.salt;
   let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
 
   if(dbPassword === hashPassword){
       console.log("비밀번호 일치");
       var token = jwt.sign({
        id: user.dataValues.id
       },
        "secretToken",
        {
        expiresIn: '10m'
        });
        res.cookie("x_auth", token).status(200);
        console.log("토큰 생김");
        return res.status(200).json({success:true})

   }
   else{
       console.log("비밀번호 불일치");
      //  res.redirect("/user/login");
       return res.status(400).json({success: false});
   }
  });
  })
      
   





module.exports = router;