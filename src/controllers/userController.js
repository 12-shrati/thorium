const userModel=require("../models/userSchema")
const jwt=require("jsonwebtoken")

const createUsers=async function(req, res) {
    var data=req.body
    let saveData= await userModel.create(data)
    res.send({msg:saveData})     
  }

  const login= async function(req,res) {
    let emailId=req.body.emailId
    let password=req.body.password
    let user = await userModel.findOne({ emaiId:emailId, password:password });
     if (!user)
    return res.send({msg: "username or the password is not corerct"});

    let token = jwt.sign({userId: user._id.toString()},
      "shrati-marathi"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  };
  
  
  let checkToken= async function (req, res) {    
    let userDetails = await userModel.findById(req.userId);
    if (!userDetails)
      return res.send({msg: "No such user exists"});
  
    res.send({data: userDetails });
  }
  

let updatedUser=async function(req,res){
  let attribute=req.body
   let updated=await userModel.findOneAndUpdate({_id:req.params.userId},{$set:attribute},{new:true})
  res.send(updated)
}

let deletedUser=async function(req,res){
  let deleted=await userModel.updateOne({_id:req.userId},{$set:{isDeleted:true}})
  res.send(deleted)
}
  
  module.exports.createUsers=createUsers
  module.exports.login=login
  module.exports.checkToken=checkToken
  module.exports.updatedUser=updatedUser
  module.exports.deletedUser=deletedUser