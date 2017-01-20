var jwt = require('jsonwebtoken');
var httpStatus = require('http-status');
var APIError = require('../helpers/APIError');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

const config = require('../../config/env');

function login(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	mongoose.model('UserModel').findOne({username: username}, function(err, userObject){
		if(userObject==null) {
			// User doesn't exist
		} else {
			bcrypt.compare(password, userObject.password, function(err, isMatch){
				if(err) {
					const err = new APIError('User not exist', httpStatus.UNAUTHORIZED);
					next(err);
				} else if(isMatch===true) {
					const token = jwt.sign({
						username: user.username
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

module.exports = { login: login };