let obj=require('../logger/logger')
let obj1=require('../util/helper.js')
let obj2=require('../validator/formatter')
let obj3=require('../loader')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.printMessage("welcome to my application.I am Shrati and part of Functionup Thorium cohort")
    obj1.information("thorium W3 D1 The topics for today is node.js module system")
    obj1.date()
    obj1.month()
    obj2.str()
    obj2.string()
    obj2.string1()
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
    obj3.chunk()
    obj3.tail()
    obj3.lod()
    obj3.pairs()
        res.send('hello there!')
    });
    
module.exports = router;