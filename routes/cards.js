const router = require('express').Router();
const {
  getCard, getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/cards', createCard);

router.get('/cards/:id', getCard);

router.get('/cards', getCards);

router.delete('/cards/:id', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
