const express = require('express');
const Router = express.Router();
const {createTicket} = require('../controller/ticket-controller')

Router.post('/create', createTicket)


module.exports = Router