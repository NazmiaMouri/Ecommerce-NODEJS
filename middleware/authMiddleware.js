
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
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);

            } else {
                const user = await User.findById(decodedToken.id);
                req.user = user; // 🔥 attach user to req object for use in next middleware/routes
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.send('not verified');
    }
}

//check current user and fetch all the user data except password and populate cart and order details

const checkUser = (req, res, next) => {
    console.log(req.cookie);
    console.log(req.url)
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
                   
                    const user = await User.findById(decodedToken.id)
                        .select('-password') // keep all user fields except password
                        .populate({
                            path: 'cart.productId',
                            model: 'Dress',
                            // pick only what you need
                        })
                      
                        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
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