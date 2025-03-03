'use strict';

const loginAccount = require(__dirname+'/../../models/forms/login.js')
	, dynamicResponse = require(__dirname+'/../../lib/misc/dynamic.js')
	, paramConverter = require(__dirname+'/../../lib/middleware/input/paramconverter.js')
	, { checkSchema, lengthBody, existsBody } = require(__dirname+'/../../lib/input/schema.js');

module.exports = {

	paramConverter: paramConverter({
		trimFields: ['username', 'password', 'twofactor'],
	}),

	controller: async (req, res, next) => {

		const { __ } = res.locals;

		const errors = await checkSchema([
			{ result: existsBody(req.body.username), expected: true, error: __('Missing username') },
			{ result: existsBody(req.body.password), expected: true, error: __('Missing password') },
			{ result: lengthBody(req.body.username, 0, 50), expected: false, error: __('Username must be 1-50 characters') },
			{ result: lengthBody(req.body.password, 0, 100), expected: false, error: __('Password must be 1-100 characters') },
			{ result: lengthBody(req.body.twofactor, 0, 6), expected: false, error: __('Invalid 2FA code') },
		]);

		if (errors.length > 0) {
			return dynamicResponse(req, res, 400, 'message', {
				'title': __('Bad request'),
				'errors': errors,
				'redirect': '/login.html'
			});
		}

		try {
			await loginAccount(req, res, next);
		} catch (err) {
			return next(err);
		}

	},

};
