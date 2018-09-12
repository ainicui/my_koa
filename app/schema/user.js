const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  sessionKey: String,
  date_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = UserSchema