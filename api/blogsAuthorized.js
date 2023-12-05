const express = require('express')
const router = express.Router();
const blogsController = require('../controllers/blogController')

router.route('/')
    .post(blogsController.createBlog);

    
router.route('/:id')
    .delete(blogsController.deleteBlog)
    .put(blogsController.updateBlog);

module.exports = router;