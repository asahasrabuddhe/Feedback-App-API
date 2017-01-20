var path = require('path');

var env = process.env.NODE_ENV || 'development';
var config = require('./' + env); // eslint-disable-line import/no-dynamic-require

var defaults = {
	root: path.join(__dirname, '/..')
};

module.exports = Object.assign(defaults, config);