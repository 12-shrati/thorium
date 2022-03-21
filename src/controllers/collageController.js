const collageModel = require("../models/collageModel")
const internModel=require('../models/internModel')

const isValidRequestBody = function (data) {
  return Object.keys(data).length > 0
}



const createCollage = async function (req, res) {
  try {
    var data = req.body
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "enter valid parameters" })
    }
    if (!(data.name)) {
      return res.status(400).send({ status: false, msg: "name required" })
    }
    if (!(data.fullName)) {
      return res.status(400).send({ status: false, msg: "fullname required" })
    }
    if (!(data.logoLink)) {
      return res.status(400).send({ status: false, msg: "logoLink required" })
    }

    if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(data.logoLink))) {
      return res.status(400).send({ status: false, message: "Logolink will be valid link " })
    }

    let collageData = await collageModel.create(data)
    res.status(201).send({ status:true,data: collageData })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}



let getCollageDetails=async function(req,res){
  try{
    let name=req.query.name
    if(!name){
      return res.status(400).send({status:false,message:"name required,Bad request"})
    }
  let collageDetails=await collageModel.findOne({name:name})
  let id=collageDetails._id
  if(!collageDetails){
    return res.status(404).send({status:false,message:"collage not found"})
  }
  
  let internsDetails=await internModel.find({collegeId:id})
  
  res.status(200).send({status:true,data:collageDetails,interest:internsDetails})
   
}
catch (error) {
  res.status(500).send({ msg: error.message })
}
}


module.exports.createCollage = createCollage
module.exports.getCollageDetails=getCollageDetails

