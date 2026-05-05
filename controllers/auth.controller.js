const authService = require('../services/auth.service');
const { createToken } = require('../utils/auth');

const maxAge = 30 * 24 * 60 * 60;


//AUTH CHECKING
const authCheckController = async (req, res) => {
    try {
        const user = authService.authCheck(req.headers.cookie);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
}

//LOGIN
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.loginService(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//SIGNUP
const signupController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.signup(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
//LOGOUT
const logoutController = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
    loginController,
    logoutController,
    authCheckController,
    signupController
}