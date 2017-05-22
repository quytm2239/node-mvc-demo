// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config
var client_path = './client';
var list_path = './list';
var backend_path = './backend';
var home_path = './home';

module.exports = function(app, mongoose, config){
	require(home_path + '/home')(app, mongoose, config);
 	require(client_path + '/client')(app, mongoose, config);
 	require(list_path + '/list')(app, mongoose, config);
	require(backend_path + '/backend')(app, mongoose, config);
};
