var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var dbUrl		= 'mongodb://localhost:27017/nodeSocial';
mongoose.connect(dbUrl);
var userModel	= require('./server/models/register');
var crypto = require('crypto');
var moment = require('moment');
var _ = require('lodash');
var port = (process.env.PORT || 9000);
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(express.static(__dirname + ''));

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
	var errors = false;
	var newUser = new userModel();
	newUser.firstName = req.body.firstName,
	newUser.lastName = req.body.lastName,
	newUser.email = req.body.email,
	newUser.password = crypto.createHash('md5').update(req.body.password).digest('hex'),
	newUser.creationDate = moment().format();
	newUser.isActive = false;
	newUser.tokenPiece = null;
   	newUser.tokenTime = null;

	//No blank entries
	if (_.isEmpty(newUser.firstName) || _.isEmpty(newUser.lastName) 
		|| _.isEmpty(newUser.email) || _.isEmpty(req.body.password)) {
			res.json({ message: 'You left blank in the form' });
			errors = true;
	} 

	//Check to see if user already exists
	userModel.findOne(newUser.email, function (err, usr) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'A user already has this email address' });
			
		}
		//
		errors = true;
	});

	if (errors == false) {
		newUser.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: 'successfully registered user!' });
			}
		});
	}

	//if (seeIfUserExists(newUser.email) === true) {
		//console.log('fount!');
	//} else {
		// newUser.save(function (err) {
		// 	if (err) {
		// 		res.send(err);
		// 	} else {
		// 		res.json({ message: 'successfully registered user!' });
		// 	}
		// });
	//}


});

//get all users DELETE THIS! UNLESS YOU WANT TO DISPLAY ALL USERS as well as their password
//use lodash to pick only certain parts and ignore the password
router.route('/getUsers').get(function (req, res) {
	userModel.find(function (err, usrs) {
		if (err) {
			res.send(err);
		} else {
			var modUser = _.map(usrs, function (u) {
				return x_xPusr(u);
			});
			res.json(modUser);
		}
	});
});

router.get('/user/:id', function (req, res) {
	userModel.findById(req.params.id, function (err, msg) {
		if (err) {
			res.send(err);
		} else {
			res.json(x_xPusr(msg));
		}
	});
});

router.post('/login/', function (req, res) {

	var email = req.body.email;
	var password = crypto.createHash('md5').update(req.body.password).digest('hex');

	userModel.findOne({ email: email, password: password }, function (err, usr) {
		if (err) {
			res.send(err);
 
		} else {
			if (!usr) {
				res.json({ message: 'Incorrect email or password.'});
			} else {
				//res.json(usr);
				var newToken = buildUserTokenWith(email, password);
				res.json({ message: newToken });
				
			}
		}
	});
});

function x_xPusr (usr) {
	return _.pick(usr, 'id', 'firstName', 'lastName', 'email', 'creationDate', 'isActive' ,'token_1', 'tokenTime');
};

function buildUserTokenWith (email, pass){
	var newEmail = crypto.createHash('md5').update(email).digest('hex');
    var userPass = crypto.createHash('md5').update(pass).digest('hex');
    var loginMoment = moment().format();

    // Push token information to user within the database
    userModel.findOne({ email: email, password: pass }, function (err, usr) {
    	if (err) {
    		return err;
    	}
    	// add the new credentials to the user,
    	// or copy over the ones that already exist
    	usr.tokenPiece = newEmail;
    	usr.tokenTime = loginMoment;
    	usr.save();
    });

    //
    return (newEmail + ' '+ userPass + ' ' + loginMoment);
};
