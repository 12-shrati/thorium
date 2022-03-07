const userModel=require('../models/userModel')

const createUsers=async function(req,res) {
    let users=req.body 
    let appUser=req.header.isFreeAppUser
    appUser=users.isFreeAppUser
    console.log(users.isFreeAppUser)    
    if(users.isFreeAppUser) { 
        let savedUsers=await userModel.create(users)
    return res.send({msg:savedUsers} )
    }else{
    return res.send("that the request is missing a mandatory header")

    }
    }

    module.exports.createUsers=createUsers