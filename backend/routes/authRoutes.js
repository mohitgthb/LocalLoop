const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

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

module.exports = router;
