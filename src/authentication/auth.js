const jwt=require('jsonwebtoken')

let authentication=function(req,res,next){
  try{
      let userId=req.params.userId
      let token = req.headers["x-auth-token"];
      if (!token) return res.status(401).send({ msg: "token must be present" });
    
      let decodedToken = jwt.verify(token, "shrati-marathi");
      console.log(decodedToken)
     if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });

      if(decodedToken.userId != userId) return res.status(403).send("unathorized access")
      req.userId=userId
      next()
  }
  catch(error){
    res.status(500).send({msg:error})
  }
}

module.exports.authentication=authentication