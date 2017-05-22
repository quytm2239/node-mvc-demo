module.exports = function(app, views_router, config){
	require('./main/mainRender')(app, views_router, config);
	console.log('mainRender is loaded');
 	require('./login/loginRender')(app, views_router, config);
	console.log('loginRender is loaded');
	require('./list/listRender')(app, views_router, config);
	console.log('listRender is loaded');
};
