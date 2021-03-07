const express = require('express');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item.model.js');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.status(200).json(items);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

module.exports = router;
