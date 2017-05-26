// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
var passwordHash = require('password-hash');
var sequelize = require('./../../dbconnection/mysql/connection');

module.exports = function(app, api_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');
	var ORM = app.get('ORM');

	api_router.post('/login', function(req, res) {
		var username = req.body.username;
		var rawpassword = req.body.password;
		console.log(username + '/' + rawpassword);
		ORM.Account.findOne({ where: {username: username} }).then(account => {
  			// project will be the first entry of the Projects table with the title 'aProject' || null
			if (account) {
				var isMatch = passwordHash.verify(rawpassword, account.dataValues.password);
				if (isMatch) {
					// setup Session
					req.session.username = account.dataValues.username;
					req.session.email = account.dataValues.email;
					req.session.hashedPassword = account.dataValues.password;

					res.redirect('/main');
				} else {
					res.redirect('/login?error=0');
				}
			} else {
				res.redirect('/login?error=0');
			}
		});
	});

	api_router.get('/logout', function(req, res) {
		req.session.destroy(function(err) {
	  	// cannot access session here
			res.redirect('/login');
		})
	});

	api_router.post('/register', function(req, res) {

		var email 	 = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var full_name = req.body.full_name;
		var gender 	 = req.body.gender;

		ORM.Account.findOne({ where: {username: username} }).then(account => {
			// project will be the first entry of the Projects table with the title 'aProject' || null
			if (account) {
				var isMatch = passwordHash.verify(rawpassword, account.dataValues.password);
				if (isMatch) {
					// setup Session
					req.session.username = account.dataValues.username;
					req.session.email = account.dataValues.email;
					req.session.hashedPassword = account.dataValues.password;

					res.redirect('/main');
				} else {
					res.redirect('/login?error=0');
				}
			} else {
				res.redirect('/login?error=0');
			}
		});

		var hashedPassword = passwordHash.generate(password);

	 	sequelize.transaction(function (t) {
			// chain all your queries here. make sure you return them.
			return ORM.Account.create({
				email: email,
				username: username,
				password: hashedPassword
			}, {transaction: t}).then(function (account) {
				return ORM.Profile.create({
					full_name: full_name,
					gender: parseInt(gender),
					account_id: account.dataValues.id
				}, {transaction: t});
			});
		}).then(function (result) {
		// Transaction has been committed
		// result is whatever the result of the promise chain returned to the transaction callback
			res.status(200).send({
				message:result
			});
		}).catch(function (err) {
		// Transaction has been rolled back
		// err is whatever rejected the promise chain returned to the transaction callback
			res.status(500).send({
				message:err
			});
		});

		// ORM.Account.create({ username: username, password: hashedPassword }).then(savedAccount => {
		//   // you can now access the newly created task via the variable task
		//   res.status(200).send({message:savedAccount});
		//  	});

		// ORM.Account.bulkCreate([
		//   { username: username, password: hashedPassword }
		// ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
		//   return ORM.Account.findAll();
		//  	}).then(account => {
		//   console.log(account) // ... in order to get the array of user objects
		//   res.redirect('/login');
		// })
	});
};
