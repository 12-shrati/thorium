const { route } = require("../routes/route")


const mid1=function(req,res,next){
    console.log("This is mid1")
    console.log(new Date())
    console.log(req.connection.remoteAddress) 
    console.log(req.route.path)
    next()
}

const mid2=function(req,res,next){
    console.log("This is mid2")
    console.log(new Date())
    console.log(req.connection.remoteAddress) 
    console.log(req.route.path)
    next()
}

const mid3=function(req,res,next){
    console.log("This is mid3")
    console.log(new Date())
    console.log(req.connection.remoteAddress) 
    console.log(req.route.path)
    next()
}

const mid4=function(req,res,next){
    console.log("This is mid4")
    console.log(new Date())
    console.log(req.connection.remoteAddress) 
    console.log(req.route.path)
    next()
}
  
module.exports.mid1=mid1
module.exports.mid2=mid2
module.exports.mid3=mid3
module.exports.mid4=mid4