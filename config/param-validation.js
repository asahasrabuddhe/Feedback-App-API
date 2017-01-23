var joi = require('joi');

module.exports = {
	// POST /api/users
	createUser: {
		body: {
			username: joi.string().required(),
			mobileNumber: joi.string().regex(/^[1-9][0-9]{9}$/).required()
		}
	},

	// UPDATE /api/users/:userId
	updateUser: {
		body: {
			username: joi.string().required(),
			mobileNumber: joi.string().regex(/^[1-9][0-9]{9}$/).required()
		},
		params: {
			userId: joi.string().hex().required()
		}
	},

	// POST /api/auth/login
	login: {
		body: {
			username: joi.string().required(),
			password: joi.string().required()
		}
	},

	// POST /api/auth/register
	register: {
		body: {
			username: joi.string().required(),
			firstname: joi.string().required(),
			lastname: joi.string().required(),
			email: joi.string().email().required(),
			role: joi.number().integer().min(1).max(2),
			password: joi.string().required()
		}
	}
};