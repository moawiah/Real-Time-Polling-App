const Poll = require('../models/pollModel');

const create_poll = (req, res) => {
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
    };

const list_polls = (req, res) => {
    Poll.find().sort({ createdAt: -1})
        .then((result) => {
            // res.send(result)
            res.render('poll/all_polls', {polls: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

const get_poll = (req, res) => {
    const id = req.params.id;
    Poll.findById(id)
    .then((result) => { 
        // res.send(result)
        res.render('poll/poll_details', {poll: result});
    })
    .catch((err) => {
        console.log(err);
        res.status(404).render('404');
    });
};

const delete_poll = async (req, res) => {
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
};

const new_poll_form = (req, res) => {
    res.render('poll/new_poll', {});
};

module.exports = {
    create_poll,
    list_polls,
    get_poll,
    delete_poll,
    new_poll_form
}