module.exports = function(app, views_router, config){
	require('./main')(app, views_router, config);
	require('./list')(app, views_router, config);
	require('./log')(app, views_router, config);
};
