const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?([^\/]+)(\/[\w\d\._~:\/?%#[\]@!$&'()*+,;="-]*)?/g.test(v);
      },
      message: props => `${props.value} is not a valid URL!`,
    },
    required: [true, 'A valid URL of user\'s avatar is required!'],
  },
});

module.exports = mongoose.model('user', userSchema);