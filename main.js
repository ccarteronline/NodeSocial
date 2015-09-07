var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = (process.env.PORT || 9000);

app.use(express.static(__dirname + ""));

http.listen(port, function (){
	console.log('listening on: ' + port);
});

app.route('/about').get(function (req, res) {
	res.redirect('/#/about');
});
	


