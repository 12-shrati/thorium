const express = require('express');
const router = express.Router();
const bookcont=require('../controller/bookcontroller')




router.post('/createbooks',bookcont.createbook)

router.get('/getbooks', bookcont.getbook)

router.post('/getbookinyear', bookcont.getbookinyear)

router.post('/getparticularbook', bookcont.getparticularbooks)

router.get('/getinrbooks', bookcont.getinrbooks)

router.get('/getrandombooks', bookcont.getrandombooks)
    
module.exports = router;