const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ticketSchema  = new Schema({
    set: {
        type:[[Number]],
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);