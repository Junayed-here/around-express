const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ newUser: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Not Valid Request' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (user) {
        return res.status(200).send({ user });
      }
      return res.status(404).send({ message: 'user not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'user not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      if (user) {
        return res.status(200).send({ user });
      }
      return res.status(404).send({ message: 'user not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'user not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.updateUsers = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ newUser: user });
      }
      return res.status(404).send({ message: 'user not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'user not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        return res.status(200).send({ newUser: user });
      }
      return res.status(404).send({ message: 'user not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'user not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};
