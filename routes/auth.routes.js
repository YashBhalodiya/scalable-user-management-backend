const express = require('express')
const authController = require('../controller/auth.controller')

const authRouter = express.Router()

// POST /auth/register
authRouter.post('/register', authController.registerUser)

// POST /auth/login
authRouter.post('/login', authController.login)

module.exports = authRouter