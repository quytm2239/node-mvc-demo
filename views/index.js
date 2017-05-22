module.exports = function(app, config){
	require('./home/homeRender')(app, config);
 	require('./login/loginRender')(app, config);
	require('./list/listRender')(app, config);
};
