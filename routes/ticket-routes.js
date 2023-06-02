const express = require('express');
const Router = express.Router();
const {createTicket, fetchTicket} = require('../controller/ticket-controller')

Router.post('/create', createTicket)
Router.get('/fetch', fetchTicket)


module.exports = Router