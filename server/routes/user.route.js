var express = require('express'),
	expressValidation = require('express-validation'),
	expressJwt = require('express-jwt'),
	paramValidation = require('../../config/param-validation'),
	user = require('../controllers/user.controller'),
	config = require('../../config/env');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/').get(expressJwt({ secret: config.jwtSecret }), user.list);

router.route('/:userID')
	
	.get(expressJwt({ secret: config.jwtSecret }), user.get)

	.post(expressJwt({ secret: config.jwtSecret }), user.update)

	.delete(expressJwt({ secret: config.jwtSecret }), user.remove);

router.param('userID', user.load);

module.exports = router;
