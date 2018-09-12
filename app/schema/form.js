const mongoose = require('mongoose');

const FromSchema = mongoose.Schema({
  user_name: String,
  address: String,
  content: String,
  imgUrl: Array,
  date_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = FromSchema