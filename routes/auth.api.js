
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { checkUser } = require("../middleware/authMiddleware");
const authController = require("../controllers/auth.controller");
const path = require('path');
const cookieParser = require("cookie-parser");



const api = process.env.DEV_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const { User } = require('../schemas & model/userSchema');
const errorHandler = require('../middleware/errorHandler');





//handle error
const handleErrors = (err) => {
    let errors = { email: '', password: '' };


    //duplicate email error
    if (err.code === 1100) {
        errors.email = ' not unique';
        return errors;
    }

    //validate error
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        return errors;
    }
    //  else {
    //     errorHandler(err)
    // }


}



//Routes

//auth checking          
router.get(`${api}/authchecking`, authController.authCheckController);

//SIGN UP Or Register 
router.post(`${api}/signup`, authController.signupController);

//LOGIN
router.post(`${api}/login`, authController.loginController);

//LOGOUT
router.get(`${api}/logout`, authController.logoutController);



// router.post(`${api}/signup`, async (req, res) => {
//     const { userName, phoneNumber, email, password, address } = req.body;
//     console.log(req.url);
//     try {
//         const user = await User.create({
//             userName, phoneNumber, email, password, address
//         })
//         const token = createToken(user._id);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(201).json({ user: user._id });
//     }
//     catch (err) {
//         console.log(req.body)
//         let error = handleErrors(err);

//         res.status(400).json({ error });
//     }
// })

// //LOgin

// router.post(`${api}/login`, async (req, res) => {
//     const { email, password } = req.body;



//     try {
//         const user = await User.login(email, password);
//         const token = createToken(user._id);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });


//         res.status(200).json(user);

//     }
//     catch (err) {
//         console.log(err)
//         let error = handleErrors(err);
//         errorHandler(err, res);
//         res.status(400).json({ error });
//     }
// })

// router.get(`${api}/logout`, async (req, res) => {

//     try {
//         console.log(res);
//         res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
//         console.log(res);//we are replacing the jwt 
//         // with a blank token at very short expiry time 
//         // so that the user is logged out
//         res.status(200).json();
//     }
//     catch (err) {
//         console.log(err)
//         let error = handleErrors(err);
//         errorHandler(err, res);
//         res.status(400).json({ error });
//     }
// })
module.exports = router;
