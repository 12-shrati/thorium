const booksmodel=require("../bookmodel/bookschema")

const createBooks=async function(req, res) {
    var data=req.body
    let saveData= await booksmodel.create(data)
    res.send({msg:saveData})     
  }

  const getBooks= async function(req,res) {
    let allBooks= await booksmodel.find()
    res.send({data:allBooks})
  }
  module.exports.createBooks=createBooks
  module.exports.getBooks=getBooks