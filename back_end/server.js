const express = require('express');
const morgan = require('morgan');
const app = express();
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://muawiyaasali:zAhILtuK7gf0kkPA@pollingappdb.iphhzly.mongodb.net/pollingAppDB?retryWrites=true&w=majority'
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const poll_routes = require('./routes/poll_routes');

// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');

// adding url middleware to access data in requests
app.use(express.urlencoded({extended: true}));

// Middleware for method override - check delete endoint
app.use(methodOverride('_method'));

// static files 
app.use(express.static('public'));

const port = 3000;



mongoose.connect(dbURI, clientOptions)
    .then((result) => app.listen(port, () => {
        console.log('listening on port ' + port);
    }))
    .catch((err) => console.log('error connecting to db' + err));

app.get('/', (req, res) => {
    res.render('index');
});

// poll routes
app.use(poll_routes);