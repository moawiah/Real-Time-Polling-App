const jwt = require('jsonwebtoken');

const auth_required = (req, res, next) => {
    const token = req.cookies.jwt;
    // check if we already have a token
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded_token) => {
            if (err) {
                console.error(err.message);
                res.redirect('/login');
            } else {
                console.log(decoded_token);
                next();
            }
        })
    } else {
        res.redirect('/login');
    };
};

module.exports = { auth_required }