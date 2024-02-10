const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address'], // We are using a 3rd party to validate the email - you can use a customized function instead of isEmail.
  },
  password: {
    type: String,
    required: [true, 'Please enter a password!'],
    minlength: [6, 'Minimum length is 6 characters!'], // Minimum password length
  },
}, { timestamps: true });

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this; // 'this' refers to the object being created and saved from the endpoint - we cannot use an arrow function here (to have this keyword working)
  const salt = await bcrypt.genSalt(); // salt is a string added to the actual password before hashing - making difficult to get the real password back in case of a broken haashing algorithm
  user.password = await bcrypt.hash(user.password, salt);
  
  next();
});

// Implement a post hook
userSchema.post('save', function (doc, next){
  console.log('New user is created & being saved', doc);
  next();
});

// Define the User model
const User = mongoose.model('user', userSchema);

module.exports = User;
