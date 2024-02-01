const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const Poll = require('./models/pollModel');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://muawiyaasali:zAhILtuK7gf0kkPA@pollingappdb.iphhzly.mongodb.net/pollingAppDB?retryWrites=true&w=majority'
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Use morgan middleware with the "combined" format
app.use(morgan('dev'));

// register view engine - it checks views folder by default
app.set('view engine', 'ejs');

// adding url middleware to access data in requests
app.use(express.urlencoded({extended: true}));

// Middleware for method override - check delete endoint
app.use(methodOverride('_method'));


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

app.post('/create-poll', (req, res) => {
    console.log(req.body);
    const poll = new Poll({
        question: req.body.title,
        options: [req.body.option_1, req.body.option_2, 
            req.body.option_3, req.body.option_4, req.body.option_5],
    });

    poll.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-polls', (req, res) => {
    Poll.find().sort({ createdAt: -1})
        .then((result) => {
            // res.send(result)
            res.render('all_polls', {polls: result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-poll/:id', (req, res) => {
    const id = req.params.id;
    Poll.findById(id)
    .then((result) => { 
        // res.send(result)
        res.render('poll_details', {poll: result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.delete('/delete-poll/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const delete_poll = await Poll.findByIdAndDelete(id);

        if (!delete_poll) {
            return res.status(404).json({ message: 'Poll not found' });
          }
      
        //   res.json({ message: 'Item deleted successfully', delete_poll });
        res.render('success', {success_msg: 'Item deleted successfully'});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});

app.get('/', (req, res) => {
    res.render('index');
});