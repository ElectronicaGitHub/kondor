var data = require('../data/data.js');

module.exports = function (express) {
	var router = express.Router();


	router.get('/', function (req, res, next) {
		res.render('main');
	})

	router.get('/tovary/:category', function (req, res, next) {
			
		var d = JSON.parse(JSON.stringify(data));

		var current_goods = d.tovary[req.params.category];
		if (current_goods) {
			current_goods.selected = true;
			res.render('tovary', {
				all_goods : d.tovary,
				current_goods : current_goods,
				current_goods_type : null
			});
		} else res.redirect('/');
	});

	router.get('/tovary/:category/:type', function (req, res, next) {
		
		var d = JSON.parse(JSON.stringify(data));

		var _category = req.params.category; 
		var _type = req.params.type;

		var current_goods = d.tovary[req.params.category];
		var current_goods_type = current_goods.types[_type];
		if (current_goods && current_goods_type) {
			current_goods.selected = true;
			current_goods_type.selected = true;
			res.render('tovary', {
				all_goods : d.tovary,
				current_goods : current_goods,
				current_goods_type : current_goods_type
			});
		} else res.redirect('/');

	})

	return router;
}