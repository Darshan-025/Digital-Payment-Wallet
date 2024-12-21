const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// User schema
const UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// User model
const User = mongoose.model('User', UserSchema);

// Account schema
const AccountSchema = new mongoose.Schema({
  username: { type: String, ref: 'User', required: true },
  balance: { type: Number, default: 0 }
});

// Account model
const Account = mongoose.model('Account', AccountSchema);

module.exports = { User, Account };
