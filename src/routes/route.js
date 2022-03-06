const express = require('express');
const router = express.Router();
const middleWare=require('../middleWare/variousMiddleWare')
const handler=require('../controller/handler')


  
router.get('/firstMiddleWare',middleWare.mid1,handler.handler)
router.get('/secondMiddleWare',middleWare.mid2,handler.handler)
router.get('/thirdMiddleWare',middleWare.mid3,handler.handler)
router.get('/fourthMiddleWare',middleWare.mid4,handler.handler)
      
module.exports = router;



