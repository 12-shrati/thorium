const blogsModel = require("../models/blogsModel")
const authorModel = require('../models/authorModel')
const moment = require('moment')

const createBlogs = async function (req, res) {
  try {
    var data = req.body

    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, msg: "BAD REQUEST" })
    }
    const authorId = data.authorId
    if (!authorId) {
      return res.status(400).send({ status: false, msg: "author must be present" })
    }
    
    let author = await authorModel.findById(authorId)
    if (!author) {
      return res.status(400).send({ status: false, msg: "invalid author" })
    }
    let saveData = await blogsModel.create(data)
    res.send({ msg: saveData })
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}

let getBlogs = async function (req, res) {
  try {
    let authorId = req.query.authorId
    let category = req.query.category
    let tags = req.query.tags
    let subCategory = req.query.subCategory
   
    let blogDetails = await blogsModel.find({ isDeleted: false, isPublished: true})
        if (!blogDetails) {
            res.status(404).send({ status: false, msg: "no blog exist"})
        }

    let blogsDetails = await blogsModel.find({$or: [{authorId: authorId},{catogory: category},{tags: tags},{subCatogory:subCategory}]})
    if (!blogsDetails) {
      return res.status(400).send({ status: false, msg: "Bad Request" })
    } else {
      return res.status(200).send({ status: true, data: blogsDetails })
    }
  }
  catch (error) {
    res.status(500).send({ msg: error.message })
  }
}

const updateBlog = async function (req, res) {
  try {

    let data = req.body
        let blogId = req.params.blogId
        let title = req.body.title
        let body1 = req.body.body
        let tags = req.body.tags
        let subCategory = req.body.subCategory

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "BAD REQUEST" })
        }
        if (!blogId) {
            res.status(400).send({ status: false, msg: "blogId is required, BAD REQUEST" })
        }

        let blogDetails = await blogsModel.find({ _id: blogId ,isDeleted: false})
        if (!blogDetails) {
            res.status(404).send({ status: false, msg: "blogId not exist" })
        } else {

            let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss")

            await blogsModel.findOneAndUpdate({ _id: blogId }, { title: title, body: body1, $push: { tags: tags, subCatogory: subCategory }, $set: { isPublished: true, publishedAt: Date }, new: true })
            let updatedDetails = await blogsModel.find({ _id: blogId })
            res.status(201).send({ status: true, data: updatedDetails })
        }

    }
  catch (error) {
    console.log(error)
    res.send({ msg: error.message })
  }
}


const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId
    if (!blogId) {
      res.status(400).send({ status: false, msg: "blogId is required, BAD REQUEST" })
    }
    let blogsDetails = await blogsModel.find({ _id: blogId }, { isDeleted: false })
    if (!blogsDetails) {
      res.status(404).send({ status: false, msg: "blog not exist" })
    } else {
      let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss")
      let blogDetails = await blogsModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: Date } })
      res.status(200).send()
      console.log(blogDetails)
    }
  }
  catch (error) {
    console.log(error)
    res.send({ msg: error.message })
  }
}

const deleteByQuery = async function (req, res) {
  try {
    let authorId = req.query.authorId
        let category = req.query.category
        let tags = req.query.tags
        let subCategory = req.query.subCategory
        let isPublished = req.query.isPublished

        if (!authorId) {
            res.status(400).send({ status: false, msg: "authorId is required, BAD REQUEST" })
        }
        if (!category) {
            res.status(400).send({ status: false, msg: "category is required, BAD REQUEST" })
        }
        if (!tags) {
            res.status(400).send({ status: false, msg: "tag is required, BAD REQUEST" })
        }
        if (!subCategory) {
            res.status(400).send({ status: false, msg: "subCategory is required , BAD REQUEST" })
            if (!isPublished) {
                res.status(400).send({ status: false, msg: "isPublished is required, BAD REQUEST" })
            }
        }
        let authorDetails = await authorModel.findOne({ _id: authorId })
        if (!authorDetails) {
            res.status(404).send({ status: false, msg: "authorId not exist" })
        } else {

            let Date = moment().format("YYYY-MM-DD[T]HH:mm:ss")
            let updatedDetails = await blogsModel.findOneAndUpdate({ authorId: authorId, catogory: category, tags: tags, subCatogory: subCategory, isPublished: isPublished }, { $set: { isDeleted: true, deletedAt: Date } })
            res.status(201).send()
            console.log(updatedDetails)
        }

    }
  catch (error) {
    console.log(error)
    res.send({ msg: error.message })
  }
}




module.exports.createBlogs = createBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog
module.exports.deleteByQuery = deleteByQuery
