const { query } = require('express')
const authormodel=require('../models/authorsmodel')
const bookmodel=require('../models/bookmodel')

const createAuthors=async function(req, res) {
let authors=req.body
let savedAuthors=await authormodel.create(authors)
res.send({msg:savedAuthors}) 
}

const createBooks= async function(req, res) {
let books=req.body
let savedBooks=await bookmodel.create(books)
res.send(savedBooks) 
}


let byAuthor=async function(req,res){
    let authorid=await authormodel.find({authorName:"Chetan Bhagat"}) 
    let id=authorid[0]._id
    let books=await bookmodel.find({author_id:id}).select({bookName:1})
    res.send({msg:books})
}
 

let newBookPrice=async function(req,res){
  let book=await bookmodel.find({bookName:"Two states"})
  let authorId=book[0].author_id
  let authorName=await authormodel.find({_id:authorId}).select({authorName:1,_id:0})
  // res.send({msg:authorName})
  let bkName=book[0].bookName
  let updatePrice=await bookmodel.findOneAndUpdate({bookName:bkName},{price:100},{new:true}).select({price:1,_id:0})
  res.send({msg:updatePrice})
}



let booksWithAuthor=async function(req,res){
 let bookCost=await bookmodel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})
 let autid=bookCost.map(input=>input.author_id)

 let temp=[]
 for(let i=0;i<autid.length;i++){
   let a=autid[i]
   const autName=await authormodel.find({_id:a}).select({authorName:1,_id:0})
   temp.push(autName)
 }
let authName=temp.flat()
res.send({msg:authName})

}




    module.exports.createAuthors=createAuthors
    module.exports.createBooks=createBooks
    module.exports.byAuthor=byAuthor
    module.exports.newBookPrice=newBookPrice
    module.exports.booksWithAuthor=booksWithAuthor