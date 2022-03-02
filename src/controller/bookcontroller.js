const { query } = require('express')

const bookmodel=require('../models/bookmodel')
const authormodel=require('../models/authorsmodel')


const createBooks= async function(req, res) {
let books=req.body
let savedBooks=await bookmodel.create(books)
res.send(savedBooks) 
}


const presentAuthor= async function(req, res) {
    let book=req.body
    let authorId=book.author_id
    let publisherId=book.publisher_id

    if(!authorId) return res.send('The request is not valid as the author details are required.')

    //validation b
    let author = await authormodel.findById(authorId)
    if(!author) return res.send('The request is not valid as no author is present with the given author id')

    //validation c
    if(!publisherId) return res.send('The request is not valid as the publisher details are required.') 

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if(!publisher) return res.send('The request is not valid as no publisher is present with the given publisher id')

    let bookCreated = await bookmodel.create(book)
    return res.send({data: bookCreated})
}




const bookByAuthorPublisher=async function(req,res){
    let bookAuthor=await bookmodel.find().populate('author_id publisher_id')
    res.send({msg:bookAuthor})
}


// const bookWithPublisher=async function(req,res){
//     let bookAuthor=await bookmodel.find().populate('publisher_id')
//     res.send({msg:bookAuthor})
// }
    
    module.exports.createBooks=createBooks
    module.exports.bookByAuthorPublisher= bookByAuthorPublisher
    // module.exports.bookWithPublisher= bookWithPublisher
    module.exports.presentAuthor= presentAuthor
    // module.exports.AuthorAbsent= AuthorAbsent