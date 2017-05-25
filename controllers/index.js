// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config
var client_path = './client';
var list_path = './list';
var backend_path = './backend';
var home_path = './home';

module.exports = function(app, api_router, ORM, config){
	require(home_path + '/home')(app, api_router, ORM, config);
 	require(client_path + '/client')(app, api_router, ORM, config);
 	require(list_path + '/list')(app, api_router, ORM, config);
	require(backend_path + '/backend')(app, api_router, ORM, config);
};
