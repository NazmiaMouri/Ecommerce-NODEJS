
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const cookieParser = require("cookie-parser");
const { User } = require('../schemas & model/userSchema');


app.use(cookieParser());
const requireAuth = (req, res, next) => {
    console.log(req.headers)
    console.log('==========================================================')
    console.log(req.headers.cookie);
    const token = req.headers.cookie;
    console.log(token);
    //check token is verified
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect(`${api}/login`);

            } else {
                req.user = decodedToken.id;
                // res.send(decodedToken);
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.send('not verified');
    }
}

//check current user

const checkUser = (req, res, next) => {
    console.log(req.cookie);
    console.log(req.url)
    let user = null;
    if (req.headers.cookie != undefined) {
        const token = req.headers.cookie;
        console.log('==========================================================')
        console.log(token);

        if (token) {
            console.log(token);
            jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {

                if (err) {
                    console.log("error: " + err.message);
                    res.status(404).json({ "message": `${err.message}` });
                    next();
                } else {
                    console.log(decodedToken);
                    user = await User.findById(decodedToken.id);
                    console.log(user);
                    res.status(200).json(user);
                    next();
                }

            })
        } else {
            res.status(404).json({ "message": "user not found" });
            next();
        }
    } else {
        res.status(404).json({ "message": "user not found" });
        next();
    }

}
module.exports = { requireAuth, checkUser };