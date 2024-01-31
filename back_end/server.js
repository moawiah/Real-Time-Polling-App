const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const Poll = require('./models/pollModel');

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://muawiyaasali:zAhILtuK7gf0kkPA@pollingappdb.iphhzly.mongodb.net/pollingAppDB?retryWrites=true&w=majority'
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');


mongoose.connect(dbURI, clientOptions)
    .then((result) => app.listen(port, () => {
        console.log('listening on port ' + port);
    }))
    .catch((err) => console.log('error connecting to db' + err));

// static files 
app.use(express.static('public'));

app.get('/create-poll', (req, res) => {
    res.render('new_poll', {});
    // const poll = new Poll({
    //     question: 'what is the best programming language?',
    //     options: ['python', 'js', 'java'],
    // });

    // poll.save()
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});

app.get('/all-polls', (req, res) => {
    Poll.find()
        .then((result) => {
            // res.send(result)
            res.render('poll_details', {polls: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-poll', (req, res) => {
    Poll.findById('65b97252221ec1de318f2d1a')
    .then((result) => { 
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});