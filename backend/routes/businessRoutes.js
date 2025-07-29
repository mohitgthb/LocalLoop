const express = require('express');
const router = express.Router();
const {
  getBusinesses,
  createBusiness,
  getBusinessById,
  addReview
} = require('../controllers/businessController');

router.get('/', getBusinesses);
router.post('/', createBusiness);
router.get('/:id', getBusinessById);
router.post('/:id/reviews', addReview);

module.exports = router;

