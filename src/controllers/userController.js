const userModel=require("../models/userSchema")
const jwt=require("jsonwebtoken")

const createUsers=async function(req, res) {
try{ 
    var data=req.body
    if(Object.keys(data).length != 0){
    let saveData= await userModel.create(data)
    res.status(201).send({msg:saveData})
    }else{
      res.status(400).send({msg:"data must be present"})
    }
}
catch(error){
  res.status(500).send({msg:error})
}     
  }



  const login= async function(req,res) {
    try{
         let emailId=req.body.emailId
         let password=req.body.password
         let user = await userModel.findOne({ emaiId:emailId, password:password });
         if (!user){
             return res.status(401).send({msg: "username or the password is not corerct"});
         }else{
             let token = jwt.sign({userId: user._id.toString()},"shrati-marathi");
             res.setHeader("x-auth-token", token);
             res.status(200).send({ status: true, data: token });
         }
    }
    catch(error){
      res.status(500).send({msg:error})
    }
  };
  
  
  let checkToken= async function (req, res) { 
    try{   
    let userDetails = await userModel.findById(req.userId);
    if (!userDetails){
      return res.status(400).send({msg: "No such user exists"});
    }else{
    res.status(201).send({data: userDetails });
    }
  }
  catch(error){
    res.status(500).send({msg:error})
  }
  }
  

let updatedUser=async function(req,res){
  try{
  let attribute=req.body
   let updated=await userModel.findOneAndUpdate({_id:req.params.userId},{$set:attribute},{new:true})
  res.status(201).send(updated)
  }
  catch(error){
    res.status(500).send({msg:error})
  }
}

let deletedUser=async function(req,res){
  try{
  let deleted=await userModel.findOneAndUpdate({_id:req.userId},{$set:{isDeleted:true}})
  res.status(200).send(deleted)
  }
  catch(error){
    res.status(500).send({msg:error})
  }
}
  
  module.exports.createUsers=createUsers
  module.exports.login=login
  module.exports.checkToken=checkToken
  module.exports.updatedUser=updatedUser
  module.exports.deletedUser=deletedUser