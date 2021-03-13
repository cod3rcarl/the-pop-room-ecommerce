const asyncHandler = require('express-async-handler');
const Item = require('../models/item.model.js');

const getItems = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Item.countDocuments({ ...keyword });
  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ items, page, pages: Math.ceil(count / pageSize) });
});

const getItemById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const getItemsBySeries = asyncHandler(async (req, res) => {
  const series = {
    $regex: req.params.name,
    $options: 'i',
  };

  const items = await Item.find({ series: series });
  if (items) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: 'item removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

const createItem = asyncHandler(async (req, res) => {
  const item = new Item({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image_front: 'images/sample.jpg',
    image_back: 'images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    series: 'Sample series',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    item.name = req.body.name;
    item.price = req.body.price;
    item.image_front = req.body.imageFront;
    item.image_back = req.body.imageBack;
    item.brand = req.body.brand;
    item.description = req.body.description;
    item.category = req.body.category;
    item.series = req.body.series;
    item.countInStock = req.body.countInStock;

    const updatedItem = await item.save();
    res.status(201).json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

const getTopItems = asyncHandler(async (req, res) => {
  const items = await Item.find({})
    .sort({ _id: -1 })
    .limit(3);
  if (items) {
    res.json(items);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

module.exports = { getItems, getItemById, deleteItem, createItem, updateItem, getItemsBySeries, getTopItems };
