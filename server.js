require('dotenv').config()
const express = require('express')
const pool = require('./db/db')

// Routes
const userRoute = require("./routes/user.routes")
const authRouter = require('./routes/auth.routes')
const activityRouter = require('./routes/activity.routes')

const app = express()
app.use(express.json())

// user routes middleware
app.use("/users", userRoute)
app.use("/auth", authRouter)
app.use("/activities", activityRouter)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  
})