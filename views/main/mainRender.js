module.exports = function(app, views_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	views_router.get('/main', function(req, res) {
        res.sendFile(__dirname + '/main.html');
	});
};
