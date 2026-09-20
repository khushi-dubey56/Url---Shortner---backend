const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_SECRET

// const tokengenerate = require("../services/auth")

async function verifyToken(req , res , next){
  const token = req.cookies.token
  try{
    const verification = jwt.verify(token , secretKey)
    req.decodedData = verification
    
    next()
  }
  catch(err){
    return res.json("the token has been tempered")
  }
  
}

module.exports = verifyToken