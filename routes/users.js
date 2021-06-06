const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');
let users;
fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err;
  users = JSON.parse(data);
});

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  users.map((user) => {
    if (user._id === req.params.id) {
      res.send(user);
    }
  });
  res.send({ message: 'User ID not found' });
});

module.exports = router;
