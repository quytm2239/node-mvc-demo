// ---------------------------------------------------------
// MAIN SCREEN (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------

module.exports = function(app, api_router, config){
	var utils = app.get('utils');
	var errcode = app.get('errcode');
	var ORM = app.get('ORM');

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

	api_router.post('/last',function (req, res) {
		var lat = req.body.lat;
		var lon = req.body.lon;
		var name = req.body.name;

		upsert(ORM.Location,{ latitude:lat, longitude:lon, name:name }, { name:name }).then(function(result){
		    res.status(200).send({success: true});
		});
	});

	api_router.get('/last',function (req, res) {
		ORM.Location.findAll().then(locations => {
			console.log(locations)
			res.status(200).send(locations);
		})
	});

	function upsert(model, values, condition) {
		return model
		.findOne({ where: condition })
		.then(function(obj) {
			if(obj) { // update
				return obj.update(values);
			}
			else { // insert
				return model.create(values);
			}
		})
	}

	api_router.get('/locations', function(req, res) {
		var arrayRandom = []
		var lat = parseFloat(isNaN(req.query.lat) ? 0 : req.query.lat)
		var lng = parseFloat(isNaN(req.query.lng) ? 0 : req.query.lng)
		for (i = 0; i < 16; i++) {
			var alpha = Math.random()
			alpha = (alpha > 0.5 ? alpha - 0.5 : alpha) / 100

			var newLat = 0; //lat + alpha * (i % 2 == 0 ? 1 : -1)
			var newLng = 0; //lng + alpha * (i % 2 == 0 ? -1 : 1)

			switch (i%4) {
				case 1:
					newLat = lat + alpha
					newLng = lng + alpha
					break;

				case 2:
					newLat = lat + alpha * -1
					newLng = lng + alpha * -1
					break;

				case 3:
					newLat = lat + alpha
					newLng = lng + alpha * -1
					break;

				case 0:
					newLat = lat + alpha * -1
					newLng = lng + alpha
					break;

				default:
			}

			arrayRandom.push({
				lat: newLat,
				lng: newLng
			})
		}
		res.status(200).send(arrayRandom);
	});
};
