var express = require('express'),
	morgan = require('morgan');
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compression = require('compression'),
	methodOverride = require('method-override'),
	cors = require('cors'),
	httpStatus = require('http-status'),
	expressWinston = require('express-winston'),
	expressValidation = require('express-validation'),
	helmet = require('helmet'),
	winston = require('./winston'),
	index = require('../server/routes/index.route'),
	env = require('./env'),
	APIError = require('../server/helpers/APIError'),
	app = express();

if (env === 'development') {
	app.use(morgan('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compression());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (env === 'development') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(expressWinston.logger({
		winstonInstance: winston,
		meta: true, // optional: log meta data about request (defaults to true)
		msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
		colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	}));
}

// mount all routes on /api path
app.use('/api', index);

// if error is not an instanceOf APIError, convert it.
app.use(function (err, req, res, next) {
	if (err) {
		// validation error contains errors which is an array of error each containing message[]
		var unifiedErrorMessage = err.errors.map(function (error) {
			return error.messages.join('. ');
		}).join(' and ');
		var error = new APIError(unifiedErrorMessage, err.status, true);
		return next(error);
	}

	return next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new PIError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});

// log error in winston transports except when executing test suite
if (env !== 'test') {
	app.use(expressWinston.errorLogger({
		winstonInstance: winston
	}));
}

// error handler, send stacktrace only during development
app.use(function (err, req, res, next) {
	return (// eslint-disable-line no-unused-vars
		res.status(err.status).json({
			message: err.isPublic ? err.message : httpStatus[err.status],
			stack: env === 'development' ? err.stack : {}
		})
	);
});

module.exports = app;