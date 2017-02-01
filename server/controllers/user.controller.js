var mongoose = require('mongoose'),
	UserModel = mongoose.model('UserModel');

function load(req, res, next, id) {
	UserModel.get(id)
		.then(function(user){
			req.user = user;
			return next(req);
		})
		.error(function(err){
			return next(err);
		});
}

function get(req,res) {
	console.log('get');
	return res.json(req.user);
}

function update(req, res, next) {
	var user = req.user.user;

	if(typeof req.body.username==='String')
		user.username = req.body.username;
	if(typeof req.body.firstname==='String')
		user.firstName = req.body.firstname;
	if(typeof req.body.lastname==='String')
		user.lastName = req.body.lastname;
	if(typeof req.body.email==='String')
		user.email = req.body.email;
	if(typeof req.body.role==='Number')
		user.role = req.body.role;
	if(typeof req.body.password==='String')
		user.password = req.body.password;
	if(typeof req.body.comments==='String')
		user.feedback.comments = req.body.comments;

	console.log(user);
	user.save(function(err, savedUser){
		if(err){
			console.log(err);
		} else {
			console.log(savedUser);
			return res.json(true);
		}
	});
}

function list(req, res, next) {
	var limit = 50, 
		skip = 0;
	UserModel.list(limit, skip)
		.then(function(users){
			return res.json(users);
		})
		.error(function(err){
			return next(err);
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