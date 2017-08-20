module.exports = function(app, views_router, config){
	require('./login')(app, views_router, config);
	require('./register')(app, views_router, config);
};
