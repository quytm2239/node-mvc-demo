module.exports = function(app, views_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	views_router.get('/login', function(req, res) {
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
