
const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');
const { auth } = require("../middleware/auth.js");
const jwt = require('jsonwebtoken');
const moment = require('moment');


router.get('/auth', auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다 -> Authentication이 true
  return res.status(200).json( {
    id: req.user.id,
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


const comparePassword = (plainPassword, hashedPassword, salt) => {
  let hashPassword = crypto.createHash("sha512").update(plainPassword + salt).digest("hex");
  return hashPassword === hashedPassword;
};

const generateToken = (user) => {
  const token = jwt.sign(
      {
          id: user.dataValues.id
      },
      "secretToken",
      {
          expiresIn: '1h'
      }
  );
  const oneHour = moment().add(1, 'hour').valueOf();

  return {
      token: token,
      tokenEXP: oneHour
  };
};

router.post("/login", (req, res, next) => {
  models.User.findOne({
      where: {
          email: req.body.email
      }
  }).then(user => {
      if (!user) {
          return res.json({
              loginSuccess: false,
              message: "Auth failed, email not found"
          });
      }

      let dbPassword = user.dataValues.password;
      let inputPassword = req.body.password;
      let salt = user.dataValues.salt;

      if (comparePassword(inputPassword, dbPassword, salt)) {
          console.log("비밀번호 일치");

          const { token, tokenEXP } = generateToken(user);

          res.cookie("x_auth", token).status(200);
          res.cookie("x_authEXP", tokenEXP);

          user.update({ token: token, tokenEXP: tokenEXP }, { where: { email: user.email } })
              .then(() => {
                  return res.status(200).json({ success: true, userId: user.id });
              });
      } else {
          console.log("비밀번호 불일치");
          return res.status(500).json({ success: false });
      }
  });
});

      
   
router.get("/logout", auth, (req, res) => {

  let newObj = {
    token : "",
    tokenEXP: ""
  };
  models.User.update(newObj, {where: {id: req.user.id}})
  .then((err, result) => {
      if(err) return res.json({ success: false, err});
      // console.log( result );
      return res.status(200).json({success:true});
})

});




module.exports = router;