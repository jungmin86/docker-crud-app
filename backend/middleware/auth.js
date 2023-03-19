const models = require("../models");
const jwt = require('jsonwebtoken');


let auth = (req, res, next) => {
    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    //토큰을 복호화한 후 유저를 찾는다.
    // User.findByToken(token, (err, user) => {
    //     if(err) throw err;
    //     if(!user) return res.json({isAuth: false, error: true});
    //     req.token = token;
    //     req.user = user;
    //     next(); //안쓰면 미들웨어에 갇힘

    // })
    jwt.verify(token, "secretToken", function (err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB의 토큰이 일치하는지?
        if (err) throw err;
        console.log(`decoded:${JSON.stringify(decoded)}`);
        models.User.findOne({ where: {id: decoded.id, token: token } })
          .then((user) => {
            if (!user)
                return res.json({
                    isAuth: false,
                    error: true
                });
            req.token = token;
            req.user = user;
            next();
          })
          .catch((err) => {
            console.log(err);
            return err;
          });
        })
        // if(err) return cb(err);
        // cb(null, user);
    
    
    //유저가 있으면 인증 OK

    //없으면 인증 no
}

module.exports = { auth };