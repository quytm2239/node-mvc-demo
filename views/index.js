module.exports = function(app, views_router, config){
	console.log('->*<- [START] Load Views ->*<-');
	require('./no_authentication')(app, views_router, config);
	require('./require_authentication')(app, views_router, config);
};
