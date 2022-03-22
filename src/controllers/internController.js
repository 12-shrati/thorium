const internModel = require('../models/internModel')
const collageModel = require('../models/collageModel')
const mongoose = require('mongoose')

const isValidRequestBody = function (data) {
  return Object.keys(data).length > 0
}

const isValidObjectId = function (ObjectId) {
  return mongoose.Types.ObjectId.isValid(ObjectId)
}

const createIntern = async function (req, res) {
  try {
    var data = req.body
    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "enter valid parameters" })
    }
    if (!(data.name)) {
      return res.status(400).send({ status: false, msg: "name required" })
    }
    if (!(data.email)) {
      return res.status(400).send({ status: false, msg: "email required" })
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
      return res.status(400).send({ status: false, message: "email will be valid email address " })
    }

    if (!(data.mobile)) {
      return res.status(400).send({ status: false, msg: "mobile number required" })
    }

    if (!(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(data.mobile))) {
      return res.status(400).send({ status: false, message: "enter valid mobile number " })
    }

    if (!(data.collegeId)) {
      return res.status(400).send({ status: false, msg: "collegeId required" })
    }
    if (!isValidObjectId(data.collegeId)) {
      return res.status(400).send({ status: false, message: "Enter valid collageId" })
    }

    let collageData = await collageModel.findOne({ _id: data.collegeId })
    if (!collageData) {
      return res.status(404).send({ status: false, message: "collage id not found" })
    }

    let internData = await internModel.create(data)
    res.status(201).send({ status: true, data: internData })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}


module.exports.createIntern = createIntern