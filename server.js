const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// connect Mongoose to your DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dewapi');

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Selamat datang -> route /biodata"});
});

// Require routes
require('./app/routes/biodata.routes.js')(app);

const port = process.env.PORT || 3000;
app.listen(port);