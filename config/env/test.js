// module.exports = {
// 	env: 'test',
// 	jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
// 	db: 'mongodb://localhost/express-mongoose-es6-rest-api-test',
// 	port: 4040
// };

module.exports = {
	env: 'development',
  	MONGOOSE_DEBUG: true,
  	jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  	db: 'mongodb://localhost/ajitemDB',
  	port: 4040
};