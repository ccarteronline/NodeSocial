var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = (process.env.PORT || 9000);

app.use(express.static(__dirname + ""));
app.use(express.static(__dirname + "/app"));

http.listen(port, function (){
	console.log('listening on: ' + port);
});