const authorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')


const createAuthor = async function (req, res) {
    try {
        const author = req.body
        const data = await authorModel.create(author)
        res.status(201).send({ status: true, data: data })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const login = async function (req, res) {
    try {
        let emailId = req.body.email
        let password = req.body.password
        if (!(emailId && password)) {
            return res.status(400).send({ status: false, msg: " Both emailId and password required" })
        }

        let authorDetails = await authorModel.findOne({ email: emailId, password: password })
        if (!authorDetails) {
            return res.status(400).send({ status: false, msg: "Not Found" })
        } else {
            let token = jwt.sign({ authorId: authorDetails._id }, "Room No-38")
            res.header("x-api-key", token)
            res.status(201).send({ status: true, msg: "You loggined successfull", data: token })
        }
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createAuthor = createAuthor
module.exports.login = login