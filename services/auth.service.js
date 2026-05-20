import User from "../schemas & model/userSchema.js";
import AppError from "../utils/AppError.js";
import { verifyToken, createToken } from "../utils/auth.util.js";


//AUTHORIZATION checking
async function authCheckService(token) {
    if (!token) throw new Error('Unauthorized');

    const decodedToken = verifyToken(token);
    console.log(decodedToken);

    return await User.findById(decodedToken.id)
        .select('-password') // keep all user fields except password
        .populate({
            path: 'cart.productId',
            model: 'Dress',
            // pick only what you need
        })

}

//LOGIN
async function loginService(email, password) {
    return await User.login(email, password);



}
//SIGNUP
async function signupService(userName, phoneNumber, email, password) {

    return await User.create({
        userName, phoneNumber, email, password
    })





}



export default {
    loginService,
    authCheckService,
    signupService
}