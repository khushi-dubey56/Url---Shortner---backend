const jwt = require("jsonwebtoken")
// const User = require("../modules/user")

const secretKey = process.env.JWT_SECRET

function tokengenerate(user){
  return jwt.sign(
    
    {id : user._id , role : user.role} , secretKey
  )
}

module.exports = tokengenerate

