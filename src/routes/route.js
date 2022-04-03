const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController')
const s3=require('../aws/s3')



router.post('/image/aws', s3.imageUrl)

router.post('/books',  bookController.createBook)



module.exports = router;