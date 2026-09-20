const mongoose = require("mongoose")


const UrlSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  url : {
    type : String,
    required : true
  },
  short : {
    type : String,
    required : true,
    unique : true
  }
})

const URL = mongoose.model("url" , UrlSchema)

module.exports  = URL