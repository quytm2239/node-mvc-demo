// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, api_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');

	api_router.get('/list', function(req, res) {
		res.status(200).send({
			list_name: "Programing Language",
			list: [
				"C/C++",
				"VB",
				"JAVa",
				"C#",
				"Ruby",
				"ObjC",
				"Swift"
			]
		});
	});

	api_router.get('/locations', function(req, res) {
		var arrayRandom = []
		var lat = parseFloat(isNaN(req.query.lat) ? 0 : req.query.lat)
		var lng = parseFloat(isNaN(req.query.lng) ? 0 : req.query.lng)
		for (i = 0; i < 10; i++) {
			var alpha = Math.random()
			alpha = (alpha > 0.5 ? alpha - 0.5 : alpha) / 100
			alpha = alpha * (i % 2 == 0 ? 1 : -1)
			var newLat = lat + alpha
			var newLng = lng + alpha

			arrayRandom.push({
				lat: newLat,
				lng: newLng
			})
		}
		res.status(200).send(arrayRandom);
	});
};
