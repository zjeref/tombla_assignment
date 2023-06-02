const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const ticketRoutes = require('./routes/ticket-routes');
const userRoutes = require('./routes/user-routes');

mongoose.connect('mongodb://127.0.0.1:27017/tombola')
    .then(() => { console.log("DB CONNECTED") })
    .catch(err => { console.log(err) });

app.use(cors());
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

