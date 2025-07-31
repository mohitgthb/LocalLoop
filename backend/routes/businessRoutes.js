const express = require('express');
const passport = require('passport');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const {
  getBusinesses,
  createBusiness,
  getBusinessById,
  addReview,
} = require('../controllers/businessController');


router.get('/', getBusinesses);
router.post('/', createBusiness);
router.get('/:id', getBusinessById);
router.post('/:id/reviews',protect, addReview);

module.exports = router;

