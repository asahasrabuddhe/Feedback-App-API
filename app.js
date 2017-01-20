var mongoose = require('mongoose');
var util = require('util');
var config = require('./config/env');
var app = require('./config/express');

const debug = require('debug')('app');

mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1 } } });
mongoose.connection.on('error', function() {
	throw new Error('unable to connect to database: ' + config.db);
});

if(config.MONGOOSE_DEBUG) {
	mongoose.set('debug', function(collectionName, method, query, doc){
		debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
	});
}

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;