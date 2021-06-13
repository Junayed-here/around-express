const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?([^/]+)(\/[\w\d._~:/?%#[\]@!$&'()*+,;="-]*)?/g.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: [true, 'Card image URL is required!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
