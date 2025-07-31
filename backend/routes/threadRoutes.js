const express = require('express');
const router = express.Router();
const {
  getThreads,
  getThreadById,
  createThread,
  addReply,
  upvoteThread
} = require('../controllers/threadController');
const {protect} = require('../middlewares/authMiddleware');

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', createThread);
router.post('/:id/replies', protect, addReply);
router.post('/:id/upvote', upvoteThread);

module.exports = router;
