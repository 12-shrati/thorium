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
    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({msg: "No such user exists"});
  
    res.send({data: userDetails });
  }

let updatedUser=async function(req,res){
  let uId=req.params.userId
  let attribute=req.body
   let updated=await userModel.updateOne({_id:uId},{$set:{attribute}})
  res.send(updated)
}

let deletedUser=async function(req,res){
  let usId=req.params.userId
  let deleted=await userModel.updateOne({_id:usId},{$set:{isDeleted:true}})
  res.send(deleted)
}
  
  module.exports.createUsers=createUsers
  module.exports.login=login
  module.exports.checkToken=checkToken
  module.exports.updatedUser=updatedUser
  module.exports.deletedUser=deletedUser