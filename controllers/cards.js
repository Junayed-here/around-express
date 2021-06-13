const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, ownerId } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ newCard: card }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .populate('owner')
    .then((data) => res.status(200).send({ card: data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'card not found!' });
      }
      return res.status(500).send({ message: `Error: ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(400).send({ message: 'Card not found!' });
    })
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res.status(400).send({ message: 'Card not found!' });
    })
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};
