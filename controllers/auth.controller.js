const authService = require('../services/auth.service');
const { createToken } = require('../utils/auth');
const maxAge = 30 * 24 * 60 * 60;

//AUTH CHECKING
const authCheck = async (req, res) => {
    try {
        const user = authService.authCheck(req.headers.cookie);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
}

//LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//SIGNUP

module.exports = {
    login,
    authCheck
}