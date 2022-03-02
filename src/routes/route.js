const express = require('express');
const router = express.Router();
const controllers=require('../controller/authorscontrollers')
const controllers1=require('../controller/publishcontrollers')
const controllers2=require('../controller/bookcontroller')



router.post('/createauthors',controllers.createAuthors)

router.post('/createPublisher',controllers1.createPublisher)

router.post('/createbooks',controllers2.createBooks)

router.post('/presentAuthor',controllers2.presentAuthor)


router.get('/bookByAuthorPublisher',controllers2.bookByAuthorPublisher)

// router.get('/bookWithPublisher',controllers2.bookWithPublisher)



    
module.exports = router;