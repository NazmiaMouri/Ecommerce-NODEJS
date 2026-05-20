
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { checkUser } from "../middleware/authMiddleware.js";
import authController from "../controllers/auth.controller.js";
import path from "path";
import cookieParser from "cookie-parser";





import  User  from "../schemas & model/userSchema.js";
//import errorHandler from "../middleware/errorHandler.js";
import catchAsync from "../utils/catchAsync.js";
import { api } from "../utils/environment_variables.js";


console.log(process.env.DEV_URL, api)


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
router.get(`${api}/authchecking`,catchAsync( authController.authCheckController));

//SIGN UP Or Register 
router.post(`${api}/signup`, catchAsync(authController.signupController));

//LOGIN
router.post(`${api}/login`, catchAsync(authController.loginController));

//LOGOUT
router.get(`${api}/logout`, catchAsync(authController.logoutController));



// router.post(`${api}/signup`, async (req, res) => {
//     const { userName, phoneNumber, email, password, address } = req.body;
//     console.log(req.url);
//     //////try {
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
export default router;
