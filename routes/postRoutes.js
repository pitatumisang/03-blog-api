
const { getAllPosts,getSinglePost,createPost,updatePost,deletePost} = require('../controllers/postController')

const express = require('express')

const router = express.Router()

router.get('/',getAllPosts)
router.post('/', createPost)
router.get('/:id', getSinglePost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)


module.exports = router