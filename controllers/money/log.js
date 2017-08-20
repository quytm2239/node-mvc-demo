// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
var passwordHash = require('password-hash');
var sequelize = require('./../../dbconnection/mysql/connection');

module.exports = function(app, api_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');
	var ORM = app.get('ORM');

    // ADD LOG
    api_router.post('/log', function(req, res) {
		console.log(req.session);
		if (req.session == null || req.session == undefined) {
			res.status(401).send({
				message: 'Request is not authenticated!'
			})
			return
		}

		var inAmount 	= req.body.amount
		var inDetail 	= req.body.detail
		var inMember 	= req.body.member
		var inAccId		= req.session.accountId

		if (!utils.chkObj(inAmount) || isNaN(inAmount)) {
			res.status(400).send({
				message: 'Amount is not valid!'
			})
			return
		}

		if (!utils.chkObj(inDetail)) {
			res.status(400).send({
				message: 'Detail is not valid!'
			})
			return
		}

		ORM.Log.create({
			amount: inAmount,
			detail: inDetail,
			account: inAccId,
			member: inMember
		}).then(savedLog => {
			// you can now access the newly created task via the variable task
			res.status(200).send(savedLog);
		});

		// ORM.Account.bulkCreate([
		//   { username: username, password: hashedPassword }
		// ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
		//   return ORM.Account.findAll();
		//  	}).then(account => {
		//   console.log(account) // ... in order to get the array of user objects
		//   res.redirect('/login');
		// })
	});

    // edit log
    api_router.put('/log', function(req, res) {
    });
    // delete log
	api_router.delete('/log', function(req, res) {
	});
};
