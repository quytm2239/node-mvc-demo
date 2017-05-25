// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
var passwordHash = require('password-hash');
var sequelize = require('sequelize');

module.exports = function(app, api_router, ORM, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	api_router.post('/login', function(req, res) {
		var username = req.body.username;
		var rawpassword = req.body.password;
		console.log(username + '/' + rawpassword);
		ORM.Account.findOne({ where: {username: username} }).then(account => {
  			// project will be the first entry of the Projects table with the title 'aProject' || null
			if (account) {
				console.log(account.dataValues);
				var isMatch = passwordHash.verify(rawpassword, account.dataValues.password);
				if (isMatch) {
					res.redirect('/main');
				} else {
					res.redirect('/login?error=0');
				}
			} else {
				res.redirect('/login?error=0');
			}
		});
	});

	api_router.post('/register', function(req, res) {

		var email 	 = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var fullname = req.body.fullname;
		var gender 	 = req.body.gender;


		var hashedPassword = passwordHash.generate(password);

		//you can also build, save and access the object with chaining:
		// ORM.Account.build({ username: username, password: hashedPassword }).save()
  // 		.then(savedAccount => {
    	// 	// you can now access the currently saved task with the variable anotherTask... nice!
		// 	res.status(200).send({
		// 		message:savedAccount
		// 	});
  // 		})
  // 		.catch(error => {
    	// 	res.status(500).send({
		// 		message:error
		// 	});
		// });

	 	return sequelize.transaction(function (t) {
			// chain all your queries here. make sure you return them.
			return ORM.Account.create({
				email: email,
				username: username,
				password: hashedPassword
			}, {transaction: t}).then(function (account) {
				return ORM.Profile.create({
					fullname: fullname,
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
