module.exports = function(app, views_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	views_router.get('/log', function(req, res) {
        res.sendFile(__dirname + '/log.html');
	});

	// views_router.get([
	// 	'/css/login.css',
	// 	'/login/css/login.css'],
	// 	function(req, res) {
	// 	res.sendFile(__dirname + '/css/login.css');
	// });
	//
	// views_router.get([
	// 	'/js/login.js',
	// 	'/login/js/login.js'],
	// 	function(req, res) {
	// 	res.sendFile(__dirname + '/js/login.js');
	// });
};
