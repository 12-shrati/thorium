const express = require('express');
const router = express.Router();
const books=require('../bookmodel/bookschema')
const bookscontroll=require('../controllers/bookscontroller')

router.post('/createbooks',bookscontroll.createBooks )
  
router.get('/getbooks',bookscontroll.getBooks )
  
      
module.exports = router;