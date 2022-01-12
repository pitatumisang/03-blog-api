const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const authorizeUser = require('../middlewares/authMiddleware.js');

const express = require('express');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', authorizeUser, createPost);
router.get('/:id', authorizeUser, getSinglePost);
router.patch('/:id', authorizeUser, updatePost);
router.delete('/:id', authorizeUser, deletePost);

module.exports = router;
