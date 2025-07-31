const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  getPostByslug,
  createPost,
  deletePost,
  updatePost,
  addComment,
  like,
  dislike
} = require('../controllers/postController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', getPosts);
// router.get('/:id', getPostById);
router.get('/:slug', getPostByslug);
router.post('/', protect, createPost);
router.delete('/:id',protect,  deletePost);
router.put('/:id',protect, updatePost);
router.post('/:slug/comments', protect, addComment);
router.post('/:slug/like', protect, like);
router.post('/:slug/dislike', protect, dislike);

module.exports = router;
 