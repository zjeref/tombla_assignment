const express = require('express');
const Router = express.Router();
const {createTicket, fetchTicket} = require('../controller/ticket-controller')

Router.post('/create', createTicket)  //   /api/ticket/create?number=2
Router.get('/fetch', fetchTicket) //   /api/ticket/fetch?currentPage=2&pageSize=3
 

module.exports = Router