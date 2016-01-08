var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var SchemaUsers = new Schema({
	name: String,
	username: { type: String, required: true, index: {unique: true}},
	password : { type: String, required: true, select: false}
})

SchemaUsers.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password'))
			return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) {
			return next(err)
		}
		user.password = hash;
		console.log(user.password);
		next();
	})
});

SchemaUsers.methods.comparePasswords = function (password) {
	var user = this;
	return bcrypt.compareSync(password, user.password)
};

module.exports = mongoose.model('User', SchemaUsers);
