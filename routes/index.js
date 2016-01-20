data = require('../data/data.js');

module.exports = function (express) {
	var router = express.Router();


	router.get('/', function (req, res, next) {
		res.render('main');
	})

	router.get('/tovary/:category', function (req, res, next) {
		res.render('tovary');
	})

	return router;
}