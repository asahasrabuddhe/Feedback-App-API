var mongoose = require('mongoose'),
	UserModel = mongoose.model('UserModel');

function load(req, res, next, id) {
	UserModel.get(id, function(err, user) {
		if(err) return next(err);
		req.user = user;
		return next();
	});
}

function get(req,res) {
	return res.json(req.user);
}

function update(req, res, next) {
	const user = req.user;
	user.username = req.body.username;
	user.firstName = req.body.firstname;
	user.lastName = req.body.lastname;
	user.email = req.body.email;
	user.role = req.body.role;
	user.password = req.body.password;

	user.save(function(err, savedUser){
		if(err) return next(err);
		return res.json(savedUser);
	});
}

function list(req, res, next) {
	const {limit = 50, skip = 0} = req.query;
	User.list({limit, skip}, function(err, users) {
		if(err) return next(err);
		return res.json(users);
	});
}

function remove(req, res, next) {
	const user = req.user;

	user.remove(function(err, removedUser){
		if(err) return next(err);
		return res.json(removedUser);
	});
}

module.exports = { load: load, get: get, update: update, list: list, remove: remove };