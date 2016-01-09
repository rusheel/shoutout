var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');
var app = express();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.database, function(err) {
	if (err) {
		console.log(err)
	}
	else console.log('Connected to database')
});

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(morgan('dev'));

//renders the static files
app.use(express.static(__dirname + '/public'));

var api = require('./app/api')(app,express, io);
// routes to api
app.use('/api',api);

app.get('*', function(req,res) {
	res.sendFile(__dirname + '/public/app/views/index.html')
});

http.listen(config.port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Listening on '+ config.port)
	}
});


