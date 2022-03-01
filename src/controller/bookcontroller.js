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
    res.send({msg:bookinyears})
   
}


const getparticularbooks=async function(req,res){
  let input=req.body  
 const particularbooks=await bookModel.find(input) 
  res.send({msg:particularbooks})
  
}



const getinrbooks=async function(req,res){
   const inrBooks=await bookModel.find({"price.indianPrice":{$in:["100INR","200INR","500INR"]}})
    
  res.send({inrBooks})
  
}


const getrandombooks=async function(req,res){
  const randomBooks=await bookModel.find({$or:[{'stockAvailable':true}, {'totalPages':{$gt:500}}]})
   
 res.send({randomBooks})
 
}


  module.exports.createbook=createbook
  module.exports.getbook=getbook
  module.exports.getbookinyear=getbookinyear
  module.exports.getparticularbooks=getparticularbooks
  module.exports.getinrbooks=getinrbooks
  module.exports.getrandombooks=getrandombooks