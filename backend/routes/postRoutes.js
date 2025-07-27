const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost
} = require('../controllers/postController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.delete('/:id',protect,  deletePost);
router.put('/:id',protect, updatePost);

module.exports = router;
 