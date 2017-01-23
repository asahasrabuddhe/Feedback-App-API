var mongoose = require('mongoose');
var util = require('util');
var config = require('./config/env');
require('./server/models/user.model');
var app = require('./config/express');

mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1 } } });
mongoose.connection.on('error', function() {
	throw new Error('unable to connect to database: ' + config.db);
});

if(config.MONGOOSE_DEBUG) {
	mongoose.set('debug', function(collectionName, method, query, doc){
		console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
	});
}

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;