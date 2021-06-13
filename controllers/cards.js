const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ newCard: card }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(404).send({ message: 'Card not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(400).send({ message: 'Card not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(404).send({ message: 'Card not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(404).send({ message: 'Card not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(404).send({ message: 'Card not found!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};
