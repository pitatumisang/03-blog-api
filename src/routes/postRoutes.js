const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const authorizeUser = require('../middlewares/authMiddleware.js');
const checkUser = require('../middlewares/checkUserMiddleware.js');

const express = require('express');

const router = express.Router();

router.get('/', checkUser, getAllPosts);
router.post('/', authorizeUser, createPost);
router.get('/:id', checkUser, getSinglePost);
router.patch('/:id', authorizeUser, updatePost);
router.delete('/:id', authorizeUser, deletePost);

module.exports = router;
