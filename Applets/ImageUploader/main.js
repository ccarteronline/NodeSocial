var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads'});
var app = express();
var http = require('http').Server(app);
var bodyParser  = require('body-parser');
var io = require('socket.io')(http);
var port = 9001;//You can change this to whatever port you want
var fs = require('fs');

//make the main directory in the public folder
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    console.log(req.file);
    console.log('path: ', req.file.path);
    var newPath = req.file.path + req.file.originalname;
    //console.log('body: ', req.body);
    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(newPath, data, function (err) {
            res.json({ message: 'file successfully uploaded' });
        });
    });
});


//create server and listen for it
http.listen(port, function(){
    console.log('listening on: ' + port);
});