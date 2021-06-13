const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateUsers, updateUserAvatar,
} = require('../controllers/users');

router.post('/users', createUser);

router.get('/users/:id', getUser);

router.get('/users', getUsers);

router.patch('/users/me', updateUsers);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
