const express = require('express');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');

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

// registered routes
app.use(poll_routes);
app.use(auth_routes);