const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const userControll=require('../controllers/userController')
const auth=require('../authentication/auth')

router.post('/users',userControll.createUsers)
  
router.post('/login',userControll.login)
 
router.get('/user/:userId',auth.authentication, userControll.checkToken)
 
router.put('/user/:userId',auth.authentication, userControll.updatedUser)

router.delete('/user/:userId',auth.authentication, userControll.deletedUser)
module.exports = router;



