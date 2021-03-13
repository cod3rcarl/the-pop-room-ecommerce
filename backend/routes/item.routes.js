const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { getItems, getItemById, deleteItem, createItem, updateItem, getItemsBySeries, getTopItems } = require('../controllers/item.controller');

router
  .route('/')
  .get(getItems)
  .post(protect, isAdmin, createItem);
router
  .route('/:id')
  .get(getItemById)
  .delete(protect, isAdmin, deleteItem)
  .put(protect, isAdmin, updateItem);

router.get('/series/:name', getItemsBySeries);
router.get('/top', getTopItems);

module.exports = router;
