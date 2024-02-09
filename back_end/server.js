const express = require('express');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');
const cookie_parser = require('cookie-parser');

const poll_routes = require('./routes/poll_routes');
const auth_routes = require('./routes/auth_routes');
const config = require('./config/db');

// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');

// adding url middleware to access data in requests
app.use(express.urlencoded({extended: true})); // Data coming from HTML forms
app.use(express.json()); // Data coming as JSON - POSTMAN for instace 
app.use(cookie_parser()); // Cookie parser - 3rd party to access cookies

// Middleware for method override - check delete endoint
app.use(methodOverride('_method'));

// static files 
app.use(express.static('public'));

config.connect_to_mongodb();

app.listen(process.env.APP_PORT, () => {
    console.log('listening on port ' + process.env.APP_PORT);
});

app.get('/', (req, res) => {
    res.render('index');
});

//cookie usage examples
app.get('/set-cookies', (req, res) => {
    //res.setHeader('Set-Cookie', 'user_data=true');
    // third argument is an options object which specifies some cookie settings - 1000*60*60*24 stands for one day
    // httpOnly: true => whether cookie to be accessed from JS through browser
    // cookies should always be used with HTTPS - check 'secure' setting in cookies for more details
    res.cookie('user_data', true, {maxAge: 1000*60*60*24, httpOnly: true}); 

    res.send('Just created a new cookie');
});

app.get('/read-cookies', (req, res) => {
    const cookie_data = req.cookies;
    console.log(cookie_data);

    res.json(cookie_data);
});

// registered routes
app.use(poll_routes);
app.use(auth_routes);