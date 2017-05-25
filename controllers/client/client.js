// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, api_router, ORM, config){
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

	api_router.post('/register', function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		ORM.Account.bulkCreate([
		  { username: username, password: password }
		]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
		  return ORM.Account.findAll();
	  	}).then(account => {
		  console.log(account) // ... in order to get the array of user objects
		  res.redirect('/login');
		})
	});
};
