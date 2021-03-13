const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const { authenticateUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, updateUser, getUserById } = require('../controllers/user.controller');

router.post('/login', authenticateUser);

router
  .route('/')
  .get(protect, isAdmin, getUsers)
  .post(registerUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

module.exports = router;
