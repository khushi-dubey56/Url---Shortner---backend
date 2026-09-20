const express = require("express")
const { handleregisterUser, handleLoginUser } = require("../controllers/user")
const route = express.Router()

route.post("/signup" , handleregisterUser)
route.post("/login" , handleLoginUser)

module.exports = route