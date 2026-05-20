import authService from "../services/auth.service.js";
import AppError from "../utils/AppError.js";
import { createToken } from "../utils/auth.util.js";
import { sendSuccess } from "../utils/responseHandler.js";

const maxAge = 30 * 24 * 60 * 60;


//AUTH CHECKING
const authCheckController = async (req, res) => {
    //try {
    const user = await authService.authCheckService(req.headers.cookie);
    if (!user) {
        throw new AppError("No user found", 401);
    }
    console.log(user);
    sendSuccess(res, {
        message: "auth successful",
        data:  user 
    });
}

//LOGIN
const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.loginService(email, password);
    if (!user) {
        throw new AppError("No user found", 401);
    }


    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendSuccess(res, {
        message: "login successful",
        data:  user 
    });


}

//SIGNUP
const signupController = async (req, res) => {
    const { email, password } = req.body;
    //try {
    const user = await authService.signup(email, password);
    if (!user) {
        throw new AppError("No user found", 401);
    }
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    sendSuccess(res, {
        message: "signup successful",
        data:  user 
    });

}
//LOGOUT
const logoutController = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    sendSuccess(res, {
        message: 'Logged out successfully',
        data: {}
    });

}

export default {
    loginController,
    logoutController,
    authCheckController,
    signupController
}