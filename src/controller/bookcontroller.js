const bookModel=require('../model/bookmodel')



const createbook= async function(req, res) {
    let data=req.body
    let saveData=await bookModel.create(data)
    res.send({msg:saveData})
      
  }


  const getbook=async function(req,res){
    const allBooks=await bookModel.find().select({bookName:1,authorName:1, _id:0})
     res.send({data:allBooks})
  }
 
  const getbookinyear=async function(req,res){
   let value=req.body.year
  const bookinyears=await bookModel.find({year:{$eq:value}})
  console.log(bookinyears)
   res.send({msg:"books in year"})
   
}


const getparticularbooks=async function(req,res){
  let input=req.body.bookName
  let year=req.body.year
  let autName=req.body.authorName
  let pages=req.body.totalPages

 const particularbooks=await bookModel.find({bookName:{$eq:input}},{year:{$eq:year}},{authorName:{$eq:autName}},{totalPages:{$eq:pages}})
 console.log(particularbooks)
  res.send({msg:"particularbooks"})
  
}



const getinrbooks=async function(req,res){
   const inrBooks=await bookModel.find({"price.indianPrice":{$in:["100INR","200INR","500INR"]}})
    
  res.send({inrBooks})
  
}


const getrandombooks=async function(req,res){
  const randomBooks=await bookModel.find({ totalPages:{$gt:500}})
   
 res.send({randomBooks})
 
}


  module.exports.createbook=createbook
  module.exports.getbook=getbook
  module.exports.getbookinyear=getbookinyear
  module.exports.getparticularbooks=getparticularbooks



  module.exports.getinrbooks=getinrbooks
  module.exports.getrandombooks=getrandombooks