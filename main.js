var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var dbUrl		= 'mongodb://localhost:27017/nodeSocial';
mongoose.connect(dbUrl);
var createUsr	= require('./server/models/register');
var crypto = require('crypto');
var moment = require('moment');
var _ = require('lodash');
var port = (process.env.PORT || 9000);
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(express.static(__dirname + ""));

io.on('connection', function (socket) {
	console.log('A user is on our site!');

	socket.on('disconnect', function () {
		console.log('A user has left the site');
	});
});

http.listen(port, function (){
	console.log('listening on: ' + port);
});

//URL routes

app.route('/about').get(function (req, res) {
	res.redirect('/#/about');
});

app.route('/login').get(function (req, res) {
	res.redirect('/#/login');
});

app.route('/signup').get(function (req, res) {
	res.redirect('/#/signup');
});

//register a user
router.route('/register').post(function (req, res) {
	var newUser = new createUsr();
	newUser.firstName = req.body.firstName,
	newUser.lastName = req.body.lastName,
	newUser.email = req.body.email,
	newUser.password = crypto.createHash('md5').update(req.body.password).digest('hex'),
	newUser.creationDate = moment().format();

	newUser.save(function (err) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'successfully registered user!' });
		}
	});
});

//get all users DELETE THIS! UNLESS YOU WANT TO DISPLAY ALL USERS as well as their password
//use lodash to pick only certain parts and ignore the password
router.route('/getUsers').get(function (req, res) {
	createUsr.find(function (err, usrs) {
		if (err) {
			res.send(err);
		} else {

			var modUser = _.map(usrs, function (u) {
				return _.pick(u, 'id', 'firstName', 'lastName', 'email', 'creationDate');
				//return _.omit(u, 'password'); //doesnt work for some reason ?
			});

			res.json(modUser);
		}
	});

});
