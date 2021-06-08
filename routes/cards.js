const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Error: ENOENT: no such file or directory, open \'/data/cards.json\']' });
    };
    res.status(404).send(JSON.parse(data));
  });
});

module.exports = router;
