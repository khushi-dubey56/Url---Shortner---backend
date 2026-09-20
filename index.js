require('dotenv').config();
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDb = require("./connection")
const UserRoutes = require("./routes/user")
const UrlRoutes = require("./routes/url")
const PORT = 8000;




const app = express()

connectDb() // database connection

app.use(express.json())
app.use(cookieParser())

app.use("/user" , UserRoutes)
app.use("/api" , UrlRoutes)

app.listen(PORT , () => {
  console.log(`Running on ${PORT}`)
})