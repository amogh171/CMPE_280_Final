var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
app.set('views', __dirname + '/app_server/views');

var index = require('./app_server/routes/index.js')



app.use('/', index);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/app_server"));
app.listen(3000);

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://DivyaBharti:cmpe280@ds133041.mlab.com:33041/overdose';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));