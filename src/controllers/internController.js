const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const mongoose = require('mongoose')

const isValidRequestBody = function (data) {
  return Object.keys(data).length > 0
}

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createIntern = async function (req, res) {
  try {
    let data = req.body
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "enter valid parameters" })
    }
    if (!(data.name)) {
      return res.status(400).send({ status: false, msg: "name required" })
    }
    if (data.name.trim().length == 0) {
      return res.status(400).send({ status: false, msg: "Fill the Name Properly" })
    }
    if (!(data.email)) {
      return res.status(400).send({ status: false, msg: "email required" })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
      return res.status(400).send({ status: false, message: "Provide valid email address " })
    }

    let duplicateEmail = await internModel.findOne({ email: data.email })
    if (duplicateEmail) {
      return res.status(400).send({ status: false, message: "email is already present" })
    }

    if (!(data.mobile)) {
      return res.status(400).send({ status: false, msg: "mobile number required" })
    }

    let duplicateMobileNo = await internModel.findOne({ mobile: data.mobile })
    if (duplicateMobileNo) {
      return res.status(400).send({ status: false, message: "mobile number is already present" })
    }

    if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(data.mobile))) {
      return res.status(400).send({ status: false, message: "enter valid mobile number " })
    }

    if (!(data.collegeId)) {
      return res.status(400).send({ status: false, msg: "collegeId required" })
    }
    if (!isValidObjectId(data.collegeId)) {
      return res.status(400).send({ status: false, message: "Enter valid collageId" })
    }

    let collageData = await collegeModel.findOne({ _id: data.collegeId })
    if (!collageData) {
      return res.status(404).send({ status: false, message: "collage id not found" })
    }


    let internData = await internModel.create(data)

    return res.status(201).send({ status: true, data: { isDeleted: false, name: internData.name, email: internData.email, mobile: internData.mobile, collegeId: internData.collegeId } })

  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createIntern = createIntern