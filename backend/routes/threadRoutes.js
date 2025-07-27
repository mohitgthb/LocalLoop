const express = require('express');
const router = express.Router();
const {
  getThreads,
  getThreadById,
  createThread,
  addReply,
  upvoteThread
} = require('../controllers/threadController');

router.get('/', getThreads);
router.get('/:id', getThreadById);
router.post('/', createThread);
router.post('/:id/replies', addReply);
router.post('/:id/upvote', upvoteThread);

module.exports = router;
