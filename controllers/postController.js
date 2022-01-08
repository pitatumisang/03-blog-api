const Post = require('../models/postModel.js');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../utils/customError.js');

//* @DESC    Get all posts
//* @ROUTE   GET /api/v1/posts
//* @ACCESS  PUBLIC
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    success: true,
    count: posts.length,
    posts,
  });
};

//* @DESC    Create post
//* @ROUTE   POST /api/v1/posts
//* @ACCESS  PUBLIC
const createPost = async (req, res) => {
  const { title, desc } = req.body;

  const post = await Post.create({ title, desc });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Post Created',
    post,
  });
};

//* @DESC    Get a single post
//* @ROUTE   GET /api/v1/posts
//* @ACCESS  PUBLIC
const getSinglePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new CustomError('Post not found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    post,
  });
};

//* @DESC    Update post
//* @ROUTE   PATCH /api/v1/posts
//* @ACCESS  PUBLIC
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  const post = await Post.findByIdAndUpdate(
    { _id: id },
    { title, desc },
    { new: true }
  );

  if (!post) {
    throw new CustomError('Post update failed', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Post Updated',
    post,
  });
};

//* @DESC    Delete post
//* @ROUTE   DELETE /api/v1/posts
//* @ACCESS  PUBLIC
const deletePost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndRemove({ _id: id });

  if (!post) {
    throw new CustomError('Post deletion failed', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Post deleted',
    post,
  });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
