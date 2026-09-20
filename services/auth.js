const jwt = require("jsonwebtoken")
// const User = require("../modules/user")

const secretKey = process.env.JWT_SECRET

function tokengenerate(user){
  return jwt.sign(
    
    {id : user._id} , secretKey
  )
}

module.exports = tokengenerate

