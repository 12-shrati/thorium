const express = require('express');
const router = express.Router();
const controllers=require('../controller/userController')
const controllers1=require('../controller/productController')
const controllers2=require('../controller/orderController')



router.post('/createUser',controllers.createUsers)

router.post('/createProducts',controllers1.createProducts)

router.post('/createOrders',controllers2.createOrders)


    
module.exports = router;