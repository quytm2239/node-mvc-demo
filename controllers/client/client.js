// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, mongoose, config){
	var express = require('express'),
		rootRouter = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.api_path,rootRouter);

	rootRouter.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		if (password == '123456') {
			res.redirect('/home');
		} else {
			res.redirect('/login?error=0');
		}

	});
};
