const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookie.jwt;

    //check json is verified
    if (token) {
        jwt.verify(token, 'al-maequl', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect(`${api}/login`);

            } else {
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
    console.log(req.cookies);
    console.log(req.url)
    if (req.cookie != undefined) {
        const token = req.cookie.jwt;
        console.log('==========================================================')
        console.log(token);

        if (token) {
            jwt.verify(token, 'al-maequl', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    next();
                } else {
                    console.log(decodedToken);
                    let user = await User.findById(decodedToken.id);
                    res.statusCode(200).json({user})
                    next();
                }

            })
        } else {
            res.status(200).json({});
            next();
        }
    } else {
        res.status(200).json({});
        next();
    }

}
module.exports = { requireAuth, checkUser };