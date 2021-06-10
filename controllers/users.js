const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ newUser: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => {res.status(200).send({ user })})
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'user not found!' });
      }
      res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.updateUsers = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id,{ name, about })
    .then((user) => res.status(200).send({ newUser: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id,{ avatar })
    .then((user) => res.status(200).send({ newUser: user }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};
