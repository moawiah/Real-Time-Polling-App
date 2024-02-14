const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { response } = require('express');

// Check token validity
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

// Check current user
const check_user = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded_token) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decoded_token.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { auth_required, check_user }