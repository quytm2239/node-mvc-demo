module.exports = function(app, api_router, mongoose, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	api_router.post('/home', function(req, res) {
	    res.status(200).send({message:'Welcome to our HOMEEEEE!!!'});
	});
};
