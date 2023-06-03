const express = require('express')
const { verifyAccount, createAccount } = require('../controller/user-controller')
const Router = express.Router()

Router.post('/verify', verifyAccount)
Router.post('/create', createAccount)

module.exports = Router