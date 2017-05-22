// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, api_router, mongoose, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	api_router.post('/login', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		if (password == '123456') {
			res.redirect('/main');
		} else {
			res.redirect('/login?error=0');
		}

	});
};
