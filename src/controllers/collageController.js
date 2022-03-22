const collageModel = require("../models/collageModel")
const internModel = require('../models/internModel')

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

    let collageData = await collageModel.create(data)
    res.status(201).send({ status: true, data: collageData })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}



let getCollageDetails = async function (req, res) {
  try {

    let collageName = req.query.name

    if (!collageName) {
      return res.status(400).send({ status: false, message: "name required,Bad request" })
    }
    let collageData = await collageModel.findOne({ name: collageName, isDeleted: false })//.select({ name: 1, fullName: 1, logoLink: 1,_id:0 })

    if (!collageData) {
      return res.status(404).send({ status: false, message: "collage not found" })
    }

    let collageDetails = {
      name: collageData.name,
      fullName: collageData.fullName,
      logoLink: collageData.logoLink,
      interests: []
    }
    let id = collageData._id
    let internsDetails = await internModel.find({ collegeId: id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

    collageDetails.interests = internsDetails
    res.status(200).send({ status: true, data: collageDetails })

  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createCollage = createCollage
module.exports.getCollageDetails = getCollageDetails

