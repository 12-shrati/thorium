const express = require('express');
const router = express.Router();
const authorcontroller = require('../controllers/authorController')
const blogsController = require('../controllers/blogsController')
const middleWare = require('../middlewares/auth')




router.post('/authors', authorcontroller.createAuthor)

router.post('/login', authorcontroller.login)

router.post('/blogs/:authorId', middleWare.authentication, blogsController.createBlogs)

router.get('/blogs/:authorId', middleWare.authentication, blogsController.getBlogs)

router.put('/blogs/:blogId/:authorId', middleWare.authentication, middleWare.authorization, blogsController.updateBlog)

router.delete('/blogs/:blogId/:authorId', middleWare.authentication, middleWare.authorization, blogsController.deleteBlog)

router.delete('/blogs/:authorId', middleWare.authentication, middleWare.authorization, blogsController.deleteByQuery)



module.exports = router;



