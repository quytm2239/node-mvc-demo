module.exports = (app, views_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	views_router.get('/list', function(req, res) {
        res.sendFile(__dirname + '/list.html');
	});
};
