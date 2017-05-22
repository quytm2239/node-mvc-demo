module.exports = function(app, views_router, config){
	require('./main/mainRender')(app, views_router, config);
 	require('./login/loginRender')(app, views_router, config);
	require('./list/listRender')(app, views_router, config);
};
