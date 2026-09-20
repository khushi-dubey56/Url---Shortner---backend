const mongoose = require("mongoose")

const Mongo_URI = process.env.MONGO_URI

const connectDb = async() => {
  try{
    await mongoose.connect(Mongo_URI);
    console.log("Database Connected")
  }
  catch(err){
    console.log("Mongo connection error" , err)
  }
}

module.exports = connectDb;


