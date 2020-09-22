const express = require('express')
const Router = express.Router()
const authenticController = require('./../controllers/AuthenticController.js')

Router.post('/register', authenticController.register)
Router.post('/login', authenticController.login)
Router.patch('/confirmed-email-verification', authenticController.confirmedEmailVerification)
Router.post('/activation-email-verification', authenticController.activationEmailVerification)
Router.post('/testmail', authenticController.testingSendEmailVerification)

module.exports = Router