const { User } = require("../schemas & model/userSchema");
const { verifyToken, createToken } = require("../utils/auth");


//AUTHORIZATION checking
async function authCheckService(token) {
    if (!token) throw new Error('Unauthorized');

    const decodedToken = verifyToken(token);
    console.log(decodedToken);
    try {
        const user = await User.findById(decodedToken.id)
            .select('-password') // keep all user fields except password
            .populate({
                path: 'cart.productId',
                model: 'Dress',
                // pick only what you need
            })

        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(user);

        return user;
    }
    catch (err) {
        throw new Error(err);
    }
}

//LOGIN
async function loginService(email, password) {
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        return token;
    }
    catch (err) {
        throw new Error(err);
    }



}
//SIGNUP
async function signupService(userName, phoneNumber, email, password) {
    try {
        const user = await User.create({
            userName, phoneNumber, email, password
        })
        const token = createToken(user._id);
        return token;
    }
    catch (err) {
        throw new Error(err);
    }



}



module.exports = {
    loginService,
    authCheckService,
    signupService
}