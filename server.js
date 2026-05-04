require('dotenv').config()
const express = require('express')
const pool = require('./db/db')

// fetch routes here
const userRoute = require("./routes/user.routes")

const app = express()
app.use(express.json())

// user routes middleware
app.use("/users", userRoute)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
})