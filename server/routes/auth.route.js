var express = require('express'),
	expressValidation = require('express-validation'),
	expressJwt = require('express-jwt'),
	paramValidation = require('../../config/param-validation'),
	auth = require('../controllers/auth.controller'),
	env = require('../../config/env');
const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post(expressValidation(paramValidation.login), auth.login);
/** POST /api/auth/register - Returns true if registration is successful */
router.route('/register').post(expressValidation(paramValidation.register), auth.register);

module.exports = router;