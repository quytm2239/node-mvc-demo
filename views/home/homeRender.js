module.exports = function(app, config){
	var express = require('express'),
		router = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.views_path,router);

	router.get('/home', function(req, res) {
        res.sendFile(__dirname + '/home.html');
	});
};
