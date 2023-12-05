const express = require('express')
const router = express.Router();
const blogsController = require('../controllers/blogController')


router.route('/')
    .get(blogsController.getAllBlogs)

    
router.route('/:id')
    .get(blogsController.getBlog)

module.exports = router;