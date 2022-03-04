const { query } = require('express')

const bookmodel=require('../models/bookmodel')
const authormodel=require('../models/authorsmodel')
const publisherModel=require('../models/publisherModel')
const authorsmodel = require('../models/authorsmodel')


const createBooks= async function(req, res) {
let books=req.body
let authorId=books.author_id
let publisherId=books.publisher_id

   

    if(!authorId) return res.send('The request is not valid as the author details are required.')

    //validation b
    let author = await authormodel.findById(authorId)
    if(!author) return res.send('The request is not valid as no author is present with the given author id')

    //validation c
    if(!publisherId) return res.send('The request is not valid as the publisher details are required.') 

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('The request is not valid as no publisher is present with the given publisher id')

    let bookCreated = await bookmodel.create(books)
    return res.send({data: bookCreated})
}




const bookByAuthorPublisher=async function(req,res){
    let bookAuthor=await bookmodel.find().populate('author_id publisher_id')
    res.send({msg:bookAuthor})
}

let updatedValuePublisher=async function(req,res){
    let updated=await publisherModel.updateMany(
        {$or:[{_id:"621f5ceb4a6d8960b55feee2"},{_id:"6220bfeffdaacf40f31ff815"}]},
        {$set:{isHardCover:"true"}}
        )
        res.send({msg:updated})

    }

    let updatedValueAuthor=async function(req,res){
        let increasedRating=await authorsmodel.updateMany({rating:{$gt:3.5}},{$inc:{price:+10}})
        res.send({msg:increasedRating})
    }



    
    module.exports.createBooks=createBooks
    module.exports.bookByAuthorPublisher= bookByAuthorPublisher
    module.exports.updatedValue=updatedValuePublisher
    module.exports.updatedValueAuthor=updatedValueAuthor
    