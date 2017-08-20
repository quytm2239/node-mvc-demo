// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config

var money_path = './money';
var home_path = './home';
module.exports = function(app, api_router, config){
	console.log('->*<- [START] Load Controller ->*<-');

	require(money_path + '/account')(app, api_router, config);
	console.log('1. account Controller is loaded');

	require(money_path + '/log')(app, api_router, config);
	console.log('1. log Controller is loaded');

	require(home_path + '/home')(app, api_router, config);
	console.log('1. home Controller is loaded');

	require('./list/list')(app, api_router, config);
};
