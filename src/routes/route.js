const express = require('express');
const router = express.Router();
const controllers=require('../controllers/axiosController')

router.get('/byDistrictId',controllers.byDistrictId)
router.get('/cityWether',controllers.cityWether) 
router.get('/sortedCities',controllers.sortedCities)
router.post('/memesWithText',controllers.memesText)
      
module.exports = router;



