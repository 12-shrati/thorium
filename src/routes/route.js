const express = require('express');
const router = express.Router();
const controllers=require('../controller/booksauthor')


router.post('/createauthors',controllers.createAuthors)

router.post('/createbooks',controllers.createBooks)

router.get('/booksByid',controllers.byAuthor)

router.get('/bookPrice',controllers.newBookPrice)

router.get('/bookWithAuthor',controllers.booksWithAuthor)
    
module.exports = router;