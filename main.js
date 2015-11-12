var express = require('express');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads'});
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
app.use(express.static(__dirname));

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

app.route('/control-panel').get(function (req, res) {
	res.redirect('/#/control-panel');
});

//register a user
router.route('/register').post(function (req, res) {
	var foundUser = false;
	var newUser = new userModel();
	newUser.firstName = req.body.firstName,
	newUser.lastName = req.body.lastName,
	newUser.email = req.body.email,
	newUser.gender = req.body.gender,
	newUser.password = crypto.createHash('md5').update(req.body.password).digest('hex'),
	newUser.creationDate = moment().format();
	newUser.isActive = false;
	newUser.tokenPiece = null;
   	newUser.tokenTime = null;

	//No blank entries
	if (_.isEmpty(newUser.firstName) || _.isEmpty(newUser.lastName)
		|| _.isEmpty(newUser.email) || _.isEmpty(req.body.password)) {
			res.json({ message: 'You left blank in the form' });
	} else {
		//Check if a user exists already
		userModel.findOne({ 'email': newUser.email }, function (err, usr) {
			if (err) {
				res.send(err);
			} else if (usr) {
				res.json({ errorMsg: 'A user already has this email address' });
			} else {
				newUser.save(function (err) {
					if (err) {
						res.send(err);
					} else {
						res.json({ message: 'Registration Successfull! Please login' });
						createUserDirectory(newUser.email);
					}
				});
			}
		});
	};

});

//get all users DELETE THIS! UNLESS YOU WANT TO DISPLAY ALL USERS as well as their password
//use lodash to pick only certain parts and ignore the password
router.get('/getUsers', function (req, res) {
	userModel.find(function (err, usrs) {
		if (err) {
			res.send(err);
		} else {
			var modUser = _.map(usrs, function (u) {
				return displaySortedUsr(u);
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
			res.json(displaySortedUsr(msg));
		}
	});
});

// This route will be used for all future requests for the webpage for getting data.
// this will check for the users token and then display the content accordingly if it is successful.
router.get('/getUserContent', function (req, res) {
	//Authenticate the user before sending in of the correct data
	authenticateUser(req.headers.token, function (stat) {
		if (stat) {
			var data = {
				message: 'Authenticated, send data as such',
				email: stat
			};
			res.json(data);
		} else {
			res.json({ message: false });
		}
	});
});

router.post('/login', function (req, res) {

	var email = req.body.email;
	var password = crypto.createHash('md5').update(req.body.password).digest('hex');

	userModel.findOne({ email: email, password: password }, function (err, usr) {
		if (err) {
			res.send(err);
		} else if (!usr) {
			res.json({ errorMsg: 'Incorrect email or password.' });
		} else {
			var newToken = buildUserTokenWith(email, password);
			res.json({ token: newToken });
		}
	});
});

router.post('/destory', function (req, res) {
	mongoose.connect(dbUrl, function (){
		//Drop the DB
		mongoose.connection.db.dropDatabase();
		res.json({ message: 'All the messages and admins dropped in: test' });
	});
});


// router.post('/uploadPhoto', function () {
// 	console.log('Something');
// });
// router.post('/uploadPhoto', upload.single('myFile'), function (req, res) {
// 	console.log(req.file);
//     console.log('path: ', req.file.path);
//     var newPath = req.file.path + req.file.originalname;
//     //console.log('body: ', req.body);
//     fs.readFile(req.file.path, function (err, data) {
//         fs.writeFile(newPath, data, function (err) {
//             res.json({ message: 'file successfully uploaded' });
//         });
//     });
// });


app.post('/uploadPhoto/:email', upload.single('myFile'), function (req, res, next) {
    //console.log(req.file);
    //console.log('path: ', req.file.path);
    upload = multer({ dest: __dirname + 'users/' + req.params.email });
    req.file.path = ('users/' + req.params.email + '/');
    var newPath = req.file.path + req.file.originalname;
    console.log('path: ', newPath);
    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
            res.json({ message: 'file successfully uploaded' });
        });
    });
});

// app.post('/uploadPhoto/:email', function (req, res, next) {
// 	console.log('Hello: ', req.params.email);
// 	//console.log(res.hello);
// });

function changePhotoDirectory (email) {

	upload = multer({ dest: './users/' + email });
	return upload.single('myFile');
};

function createUserDirectory (withEmail) {
	fs.mkdir(('users/' + withEmail), 0777, function (err) {
		if (err) {
			return console.error(err);
		}
        console.log('created User directory');
    });
};

function displaySortedUsr (usr) {
	return _.pick(usr, 'id', 'firstName', 'lastName', 'gender','email', 'creationDate', 'isActive' ,'token_1', 'tokenPiece', 'tokenTime');
};

function buildUserTokenWith (email, pass){
	var newEmail = crypto.createHash('md5').update(email).digest('hex');
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
    return (newEmail + pass + loginMoment);
};

function authenticateUser (token, callback) {
	var firstPiece = token.substr(0, 32);
	var passPiece = token.substr(32, 32);
	var loginDate = token.substr(64,64);
	loginDate = moment().diff(loginDate, 'hours');
	console.log('What is the time? ', loginDate);
	var timeLimit = 10;
	var preparedUserSearch = {
		tokenPiece: firstPiece,
		password: passPiece
	};

	userModel.findOne(preparedUserSearch, function (err, u) {
		if (err) {
			return callback(err);
		} else if (u === null) {
			return callback(false);
		} else if (loginDate <= timeLimit) {
			return callback(u.email);
		} else {
			return callback(false);
		}
	});
};
