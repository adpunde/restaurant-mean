var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();

var db = require('./config/db');

var hostip = '10.0.0.100';
var port = 4000;

// Connect to mongodb using mongoose ODM
mongoose.connect(db.url);
db.connection = mongoose.connection;
db.connection.on('error', console.error.bind(console, 'connection error:'));
db.connection.once('open', function () {
    console.log('Connected to mongodb');
});

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// routes
require('./app/routes')(app);

// start the server
app.listen(port, hostip, function () {
    console.log('Server running at: http://' + hostip + ':'+ port);
});

// export app
module.exports = app;
