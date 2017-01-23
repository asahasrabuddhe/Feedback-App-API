var winston = require('winston');

var logger = new winston.Logger({
	transports: [new winston.transports.Console({
		json: true,
		colorize: true
	})]
});

module.exports = logger;