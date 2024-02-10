const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expiry_interval = 3*24*60*60; // 3 days in seconds

// Error handler
const error_handler = (err) => {
    console.error(err.message, err.code);
    let errors = {email: '', password: ''};

    // Report duplicate errors
    if (err.code === 11000){
        errors.email = 'That email already exists!'
        return errors;
    }

    if (err.message.includes('user validation failed')){ // check for "user validation failed" in error message to catch validation errors
        // Navigate through err object and get values (without keys) of the errors fields for futher processing
        Object.values(err.errors).forEach(({properties}) => {
                errors[properties.path] = properties.message;
            })
    }

    return errors;
}

// token creation function
const create_token = (id) => {
    return jwt.sign(
        {id}, //payload
        process.env.SECRET_KEY, // secret key
        {
        expiresIn: expiry_interval // optional object for token settings
    });
}

const signup_get = (req, res) => {
    res.render('auth/signup');
};

const signup_post = async (req, res) => {
    const {username, email, password} = req.body;
    
    //TODO: check create method directly in mongoose
    user = new User({username: username, 
        email: email, 
        password: password});

    try {
        result = await user.save();
        if (!result) {
            console.log('Error saving user!');
        }
        // create new token
        const token = create_token(user._id);
        console.log(token);
        // create a cookie in response to save token
        res.cookie('jwt', token, {httpOnly: true, maxAge: expiry_interval * 1000}); //httponly is to block JS changes from browser
        res.status(201).redirect('/');
        
    } catch (err) {
        const errors = error_handler(err);
        res.status(400).render('auth/error', {error_msg: errors}); //returned error message as a string TODO: handle error as an object
    };

};

const login_get = (req, res) => {
    res.render('auth/login');
};

const login_post = async (req, res) => {
    const {username, email, password} = req.body;
    console.log(username, email, password);
    res.send('user logged in!');
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
}