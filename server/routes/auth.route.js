var express = require('express'),
	expressValidation = require('express-validation'),
	expressJwt = require('express-jwt'),
	paramValidation = require('../../config/param-validation'),
	auth = require('../controllers/auth.controller'),
	env = require('../../config/env'),
	router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(expressValidation(paramValidation.login), auth.login);

module.exports = router;