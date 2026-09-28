const User = require("../modules/user")
const bcrypt = require("bcrypt")
const tokengenerate = require("../services/auth")


async function handleregisterUser(req , res) {
  const user = req.body
  if(!user || !user.name || !user.email || !user.password){
    console.log(user)
    return res.json({msg : "all fields are required"})
  }
  
  const emailCheck = await User.findOne({email : user.email})
    if(emailCheck){
     return res.json({msg : "email already exist"})
   }

   const saltRounds = 10;
   const hashedPassword = await bcrypt.hash(user.password , saltRounds)
  

  const createnewUser =  await User.create({
    name : user.name,
    email : user.email,
    password : hashedPassword,
    
   })
   res.json({msg : "user has been created" , createnewUser})
  
}


async function handleLoginUser(req , res) {
  const user = req.body
  if(!user.email || !user.password){
    return res.json({msg : "all fields required"})
  }
  
  const UserCheck = await User.findOne({email : user.email})
  
  if(!UserCheck){
    return res.redirect("/login")
   }
  const passwordCheck = await bcrypt.compare(user.password , UserCheck.password)
  if(!passwordCheck){
    return res.json("password incorrect")
  }
  //jwt token generation 
  const token = tokengenerate(UserCheck)
  res.cookie("token" , token)
  res.json({msg : "logged in"})
}


module.exports = {
  handleregisterUser,
  handleLoginUser
}