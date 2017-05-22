module.exports = function(app, views_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	views_router.get('/main', function(req, res) {
        res.sendFile(__dirname + '/main.html');
	});

	views_router.get('/css/main.css', function(req, res) {
		res.sendFile(__dirname + '/css/main.css');
	});

	views_router.get('/js/main.js', function(req, res) {
		res.sendFile(__dirname + '/js/main.js');
	});
};
