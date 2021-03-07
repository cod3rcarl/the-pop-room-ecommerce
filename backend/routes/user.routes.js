const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('APP is running');
});

router.get('/:id', (req, res) => {
  const item = items.find((i) => i._id === req.params.id);
  res.json(item);
});

module.exports = router;
