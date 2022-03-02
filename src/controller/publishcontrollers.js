const publisherModel=require('../models/publisherModel')

const createPublisher=async function(req, res) {
    let publisher=req.body
    let savePublisher=await publisherModel.create(publisher)
    res.send({msg:savePublisher}) 
    }

    module.exports.createPublisher=createPublisher