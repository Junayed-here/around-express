const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/cards.json');
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

module.exports = router;
