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

		ORM.Account.findOne({ where: {username: username} }).then(account => {
  			// project will be the first entry of the Projects table with the title 'aProject' || null
			if (account) {
				var isMatch = passwordHash.verify(rawpassword, account.dataValues.password);
				if (isMatch) {
					// setup Session
					req.session.username = account.dataValues.username;
					req.session.email = account.dataValues.email;
					req.session.hashedPassword = account.dataValues.password;

					res.status(200).send({
						success: true,
						message: 'Login successfully!'
					});
				} else {
					res.status(400).send({
						success: false,
						message: 'Wrong username or password!'
					});
				}
			} else {
				res.status(400).send({
					success: false,
					message: 'Wrong username or password!'
				});
			}
		});
	});

	api_router.post('/logout', function(req, res) {
		req.session.destroy(function(err) {
	  	// cannot access session here
			res.redirect('/login');
		})
	});

	api_router.post('/register', function(req, res) {

		var inEmail 	= req.body.email
		var inUsername 	= req.body.username
		var inPassword 	= req.body.password
		var inFullname 	= req.body.fullname
		var inGender   	= req.body.gender
		var inBalance  	= req.body.balance

		if (!utils.chkObj(inUsername)) {
			res.status(400).send({
				message: 'Username is not valid!'
			})
			return
		}

		if (!utils.chkObj(inEmail) || utils.validateEmail(inEmail) == false) {
			res.status(400).send({
				message: 'Email is not valid!'
			})
			return
		}

		if (!utils.chkObj(inPassword)) {
			res.status(400).send({
				message: 'Password is not valid!'
			})
			return
		}

		if (!utils.chkObj(inFullname)) {
			res.status(400).send({
				message: 'Fullname is not valid!'
			})
			return
		}

		if (!utils.chkObj(inBalance) || isNaN(inBalance)) {
			res.status(400).send({
				message: 'Balance is not valid! (must be number and > 0)'
			})
			return
		}

		// Check email/username/fullname
		ORM.Account
			.findOrCreate({
				where: {
					$or: [
						{ username: inUsername },
						{ email: inEmail },
						{ fullname: inPassword }
					]
				}, defaults: {
					username: inUsername,
					email: inEmail,
					fullname: inPassword,
					password: passwordHash.generate(inPassword),
					balance: inBalance,
					gender: inGender
				}
			})
			.spread((user, created) => {
				if (created) {
					res.status(200).send({
						message: 'Account is created successfully!'
					})
				} else {
					if (inUsername == user.username) {
						res.status(400).send({
							message: 'Username already existed!'
						})
					} else if (inEmail == user.email) {
						res.status(400).send({
							message: 'Email already existed!'
						})
					} else {
						res.status(400).send({
							message: 'Fullname already existed!'
						})
					}
				}
			})

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
