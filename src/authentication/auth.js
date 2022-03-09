const jwt=require('jsonwebtoken')

let authentication=function(req,res,next){
  let userId=req.params.userId
   let token = req.headers["x-auth-token"];
    if (!token) return res.send({ msg: "token must be present" });
    
    let decodedToken = jwt.verify(token, "shrati-marathi");
    console.log(decodedToken)
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });

      if(decodedToken.userId != userId) return res.send("unathorized access")
      req.userId=userId
      next()
}
module.exports.authentication=authentication