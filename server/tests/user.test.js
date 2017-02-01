const mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	httpStatus = require('http-status'),
	should = chai.should(),
	app = require('../../app');

chai.use(chaiHttp);
chai.config.includeStack = true;

after(function(done){
	mongoose.models = {};
	mongoose.modelSchemas = {};
	mongoose.connection.close();
	done();
});

describe('## User APIs', function() {
	var user = {
		username: 'testuser',
		firstName: 'Test',
		lastName: 'User',
		email: 'test@user.com',
		role: 1,
		password: 'test@123'
	};

	describe('# GET /api/health-check', function() {
		it('should return OK', function(done) {
			chai.request(app)
				.get('/api/health-check')
				.end(function(err,res) {
					console.log(res.body);
					res.should.have.status(httpStatus.OK);
					res.body.should.be.a('string');
					res.body.should.equal('OK');
				done();
			});
		});
	});

	describe('# POST /api/auth/register', function() {
		it('should create a new user', function(done) {
			chai.request(app)
				.post('/api/auth/register')
				.set('content-type', 'application/x-www-form-urlencoded')
				.send(user)
				.end(function(err,res) {
					res.should.have.status(200);
					res.body.username.should.be.a('string');
					res.body.username.should.equal(user.username);					
					res.body.firstName.should.be.a('string');
					res.body.firstName.should.equal(user.firstName);					
					res.body.lastName.should.be.a('string');
					res.body.lastName.should.equal(user.lastName);					
					res.body.email.should.be.a('string');
					res.body.email.should.equal(user.email);					
					res.body.role.should.be.a('number');
					res.body.role.should.equal(user.role);					
					res.body.password.should.be.a('password');
					res.body.password.should.equal(user.password);
				done();
			});
		});
	});
});