const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout } = require('../controllers/authController');

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 6 chars').isLength({ min: 6 })
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').notEmpty()
  ],
  login
);

// Refresh token  
router.post('/refresh', refresh);
// Logout
router.post('/logout', logout);

module.exports = router;
