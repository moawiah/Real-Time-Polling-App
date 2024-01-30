const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pollSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: (options) => options.length >= 3, // At least two options required
            message: 'Poll must have at least two options.',
        },
    },
    votes: {
        type: Map,
        of: Number,
        default: {},
      },
    //   createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //   },
    }, 
    { timestamps: true });

// Define the Poll model
const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;