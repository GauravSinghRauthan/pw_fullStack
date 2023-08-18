const express = require('express')
const authRouter = express.Router()
const {signUp,signIn,getUserDetails} = require('../controller/user.controller.js')
const {signupValidator} = require('../middleware/signUP.js')
const {signinValidator} = require('../middleware/signIn.js')
const {authenticateUser} = require('../middleware/authUser.js')

authRouter.post('/signup',signupValidator,signUp)

authRouter.post('/signin',signinValidator,signIn)

authRouter.get('/',authenticateUser,getUserDetails)
module.exports = authRouter