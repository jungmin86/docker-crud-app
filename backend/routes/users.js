const { response } = require('express');
const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require('crypto');


router.post("/register", (req, res, next) => {

    let body = req.body;
    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    models.User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashPassword,
        salt: salt
    })
    .then( response => {
        return res.status(200).json({registerSuccess: true, response});
    })
    .catch(err => {
        console.log(err);
    })

    
});

module.exports = router;