const User = require('../models/userModel');

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
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).send('error, user not created!');
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