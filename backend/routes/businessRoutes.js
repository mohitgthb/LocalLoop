const express = require('express');
const router = express.Router();
const {
  getBusinesses,
  createBusiness
} = require('../controllers/businessController');

router.get('/', getBusinesses);
router.post('/', createBusiness);

module.exports = router;

