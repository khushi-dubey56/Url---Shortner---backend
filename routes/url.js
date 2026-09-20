const express = require("express")
const { handleGenerateShortId, handleGetallShortId, handleOriginalUrl } = require("../controllers/url")
const verifyToken = require("../middlewares/authent")
const route = express.Router()

route.post("/create" ,verifyToken , handleGenerateShortId)
route.get("/all" , verifyToken , handleGetallShortId)
route.get("/:shorturl" , handleOriginalUrl)

module.exports = route;