const express = require('express');
const router = express.Router();
const poll_controller = require('../controllers/poll_controller');
const { auth_required } = require('../middleware/auth_middleware');

router.get('/create-poll', poll_controller.new_poll_form);

router.post('/create-poll', auth_required, poll_controller.create_poll);

router.get('/all-polls', poll_controller.list_polls);

router.get('/single-poll/:id', poll_controller.get_poll);

router.delete('/delete-poll/:id', auth_required, poll_controller.delete_poll);

router.get('/poll_voting_list', auth_required ,poll_controller.list_voting_polls);

router.get('/poll_voting_details/:id', auth_required, poll_controller.poll_voting_details);

router.post('/submit-vote/:id', auth_required, poll_controller.submit_vote);

module.exports = router;