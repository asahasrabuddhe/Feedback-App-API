var jwt = require('jsonwebtoken');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');
const config = require('../../config/env');

function login(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	mongoose.model('UserModel').findOne({username: username}, function(err, user){
		if(user==null) {
			const err = new APIError('User not exist', httpStatus.UNAUTHORIZED);
			next(err);
		} else {
			bcrypt.compare(password, user.password, function(err, isMatch){
				if(err) {
					const err = new APIError('Password is incorrect', httpStatus.UNAUTHORIZED);
					next(err);
				} else if(isMatch===true) {
					const token = jwt.sign({
						user: user
					}, config.jwtSecret);

					return res.json({
						token,
						username: user.username
					});
				} else {
					const err = new APIError('User not exist', httpStatus.UNAUTHORIZED);
					next(err);
				}
			});
		}
	});
}

function register(req, res, next) {
	var user = new UserModel();

	user.username = req.body.username;
	user.firstName = req.body.firstname;
	user.lastName = req.body.lastname;
	user.email = req.body.email;
	user.role = req.body.role;
	user.password = req.body.password;

	user.save(function(err, savedUser){
		if(err){
			console.log(err);
		} else {
			console.log(savedUser);
			return res.json(true);
		}
	});
}

module.exports = { login: login, register: register };