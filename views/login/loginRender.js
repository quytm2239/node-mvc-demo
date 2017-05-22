module.exports = function(app, config){
	var express = require('express'),
		router = express.Router();

	var utils = app.get('utils');
	var errcode = app.get('errcode');
	app.use(config.views_path,router);

	router.get('/login', function(req, res) {
	    var error = req.query.error;
        if (utils.chkObj(error)) {
			if (error == '0') {
				res.sendFile(__dirname + '/login_error.html');
			} else {
				res.sendFile(__dirname + '/login.html');
			}
        } else {
            res.sendFile(__dirname + '/login.html');
        }
	});
};
