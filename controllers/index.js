// Divide all of your modules in different files and
// require them here
// app is express's app
// setting is defined in /config

var money_path = './money';

module.exports = function(app, api_router, config){
	console.log('->*<- [START] Load Controller ->*<-');

	require(money_path + '/account')(app, api_router, config);
	console.log('1. home Controller is loaded');
};
