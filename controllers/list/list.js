// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, mongoose, config){
	var express = require('express'),
		rootRouter = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.api_path,rootRouter);

	rootRouter.get('/list', function(req, res) {
		res.status(200).send({
			list_name: "Programing Language",
			list: [
				"C/C++",
				"VB",
				"JAVa",
				"C#",
				"Ruby",
				"ObjC",
				"Swift"
			]
		});
	});
};
