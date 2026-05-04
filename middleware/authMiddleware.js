
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const cookieParser = require("cookie-parser");
const { User } = require('../schemas & model/userSchema');
const { verifyToken } = require('../utils/auth');


app.use(cookieParser());
const requireAuth = async (req, res, next) => {

    const token = req.headers.cookie;
    //check token is verified

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decodedToken = verifyToken(token);
    console.log(decodedToken);

    const user = await User.findById(decodedToken.id);
    console.log(user);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // 🔥 attach user to req object for use in next middleware/route   s

    next();

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