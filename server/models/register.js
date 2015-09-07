var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var regSchema	= new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	creationDate: Date
	
});

module.exports = mongoose.model('register', regSchema);