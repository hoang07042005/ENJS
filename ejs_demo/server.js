
const express= require('express');
const mongoose = require('mongoose');
// const app = express();
const app = require('./app');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/EJS')
        .then(() => {
            console.log("connection successful.");
        })
        .catch(() => {
            console.log('unconnection to database');
        })


app.listen(9000, () => {
    console.log(`server listining on ${9000}`);
})



