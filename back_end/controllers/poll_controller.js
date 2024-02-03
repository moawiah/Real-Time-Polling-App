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

const submit_vote = async (req, res) => {
    const id = req.params.id;
    const voting_data = req.body;
    
    try {
        poll = await Poll.findById(id);
        if (!poll || !voting_data){
            return res.status(404).send('Poll not found OR Empty Voting Data');
        }

        console.log(voting_data.selectedOption);
        console.log(poll.votes);
        voting_map = poll.votes;
        voting_choice = voting_data.selectedOption;

        const choice_cnt = voting_map.has(voting_choice);
        
        if (!choice_cnt) {
            voting_map.set(voting_choice, 1);
            console.log(voting_map);
        }
        else {
            const current_cnt = voting_map.get(voting_choice);
            voting_map.set(voting_choice, current_cnt+1);
            console.log(voting_map);
        }

        await poll.save();
        res.status(200).send('Vote submitted successfully!');

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }



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

const list_voting_polls = (req, res) => {
    Poll.find().sort({ createdAt: -1})
        .then((result) => {
            // res.send(result)
            res.render('poll/poll_voting_list', {polls: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

const poll_voting_details = (req, res) => {
    const id = req.params.id;
    Poll.findById(id)
        .then((result) => {
            // res.send(result)
            res.render('poll/poll_voting_details', {poll: result});
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
    new_poll_form,
    list_voting_polls,
    poll_voting_details,
    submit_vote
}