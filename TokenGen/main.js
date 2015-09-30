var express = require('express');
var moment = require('moment');
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var port = (process.env.PORT || 7000);//this is needed for heroku
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(express.static(__dirname + "/"));

http.listen(port, function(){
    console.log('listening on: ' + port);
    var myMoment = moment().format();
    console.log('moment: ', myMoment);
});

router.post('/login', function (req, res) {
    // Instead of checking for the proper username here,
    // check to see that you have the correct person in the database
    if (req.body.email == 'chris@ccarteronline.com' && req.body.pass == 'password5') {
        res.json({ token: userToken(req.body.email, req.body.pass) });
    } else {
        res.json({ message: 'incorrect user credentials' });
    }

});

router.get('/authContent', function (req, res) {
    var specialContent = 'Welcome user! You are currently logged in and can see this wonderful content';
    if (validateTokenAndSend(req.headers.token)) {
        res.json({ authContent:specialContent });
    } else {
        res.json({ message: 'killToken' });
    }

});

function userToken (email, usersPass) {
    // var email = crypto.createHash('md5').update(email).digest('hex');
    // var usersPass = crypto.createHash('md5').update(usersPass).digest('hex');
    // var loginMoment = moment().format();
    // return (email + ' '+ usersPass + ' ' + loginMoment);\
    return 'hello!';
};

function validateTokenAndSend (token) {
    if (token == 'hello!') {
        return true;
    } else {
        return false;
    }
};

// At the moment, the token is created with the following format, however it may be best to
// leave the date unformated so that you can easily compare them and not have to worry about
// decrypting them. I think I will experiment with doing just that. We can return the date
// back with its formating and then compare the time that has passed by verifying the token
