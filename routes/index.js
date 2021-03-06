var data = require('../data/data.js');

var newRequestTmpl = require('../mailTemplate/newRequest.js');
var newCallbackTmpl = require('../mailTemplate/newCallback.js');
var newCommentTmpl = require('../mailTemplate/newComment.js');

// почтовая залупа
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var transport = nodemailer.createTransport(mandrillTransport({
	auth: {
		apiKey: '4Xj9PqPRZMf48cOOLBohIg'
	}
}));

module.exports = function (express) {
	var router = express.Router();

	router.use(function (req, res, next) {
		res.locals.header_goods = data.tovary;
		next();
	});

	router.get('/', function (req, res, next) {
		res.render('main' , {
			interiors : data.interiors
		});
	});

	router.get('/materials', function (req, res, next) {
		res.render('materials');
	});

	router.get('/prices', function (req, res, next) {
		res.render('prices');
	});

	router.get('/about', function (req, res, next) {
		res.render('about');
	});

	router.get('/dostavka', function (req, res, next) {
		res.render('dostavka');
	});

	router.get('/contacts', function (req, res, next) {
		res.render('contacts');
	});

	router.get('/comments', function (req, res, next) {
		res.render('comments');
	});

	router.get('/interior/:category', function (req, res, next) {
		var d = JSON.parse(JSON.stringify(data));

		var _category = req.params.category;

		var current_goods = d.interiors[_category];
		if (current_goods) {

			console.log(current_goods);

			res.render('tovar', {
				all_goods : d.tovary,
				current_goods : current_goods,
				current_goods_type : current_goods,
				number : 0,
				breadcrumbs : [
					{ name : 'Примеры мебели на заказ', url : '/' }
				]
			});
		} else res.redirect('/');
	});

	// получение карточки товара не имеющего типа
	// router.get('/tovar/:category', function (req, res, next) {
	// 	var d = JSON.parse(JSON.stringify(data));

	// 	var _category = req.params.category;
	// 	var current_goods = d.tovary[_category];

	// 	console.log(current_goods);
		
	// 	if (current_goods) {

	// 		res.render('tovar', {
	// 			all_goods : d.tovary,
	// 			current_goods : null,
	// 			current_goods_type : current_goods,
	// 			breadcrumbs : MISC.makeBreadCrumbs(current_goods.name, _category)
	// 		});
	// 	} else res.redirect('/');
	// });

	// получение карточки товара имеющего тип
	router.get('/tovar/:category/:type/:id', function (req, res, next) {
		var d = JSON.parse(JSON.stringify(data));

		var _category = req.params.category;
		var _type = req.params.type;
		var _id = req.params.id;

		if (_type == 'default') {	
			var current_goods = d.tovary[_category];
			if (current_goods) {
				res.render('tovar', {
					all_goods : d.tovary,
					current_goods : null,
					current_goods_type : current_goods,
					number : _id,
					breadcrumbs : MISC.makeBreadCrumbs(current_goods.name, _category)
				});
			} else res.redirect('/');
		} else {
			var current_goods = d.tovary[_category];
			var current_goods_type = current_goods.types[_type];
			if (current_goods && current_goods_type) {
				res.render('tovar', {
					all_goods : d.tovary,
					current_goods : current_goods,
					current_goods_type : current_goods_type,
					number : _id,
					breadcrumbs : MISC.makeBreadCrumbs(current_goods.name, _category, current_goods_type.name, _type)
				});
			} else res.redirect('/');
		}
	});

	// получение полного каталога
	router.get('/tovary', function (req, res, next) {
			
		var d = JSON.parse(JSON.stringify(data));

		res.render('tovary', {
			all_goods : d.tovary,
			current_goods : null,
			current_goods_type : null,
			breadcrumbs : null
		});
	});

	// получение каталога по категории
	router.get('/tovary/:category', function (req, res, next) {
			
		var d = JSON.parse(JSON.stringify(data));
		var _category = req.params.category;

		var current_goods = d.tovary[_category];
		if (current_goods) {
			current_goods.selected = true;

			res.render('tovary', {
				all_goods : d.tovary,
				current_goods : current_goods,
				current_goods_type : null,
				each_goods_url : '/tovar/' + _category
			});
		} else res.redirect('/');
	});

	// получение каталога по категории и типу
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
				current_goods_type : current_goods_type,
				each_goods_url : '/tovar/' + _category + '/' + _type
			});
		} else res.redirect('/');
	});

	router.post('/create_offer', function (req, res, next) {

		var body = req.body;

		transport.sendMail({
			from : "antonovphilipdev@gmail.com",
			to: "molo4nik11@gmail.com",
			subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Поступил новый запрос =)))',
			html: newRequestTmpl(body)
		}, function (err, info) {
			if (err) callback(err);

			res.json({
				message : 'ok'
			});
			
			transport.sendMail({
				from : "antonovphilipdev@gmail.com",
				to: "vladimirnovikovski@gmail.com",
				subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Поступил новый запрос =)))',
				html: newRequestTmpl(body),
			}, function (err, info) {
				if (err) callback(err);
			});
		});
	});

	router.post('/create_callback', function (req, res, next) {

		var body = req.body;

		console.log(body);

		transport.sendMail({
			from : "antonovphilipdev@gmail.com",
			to: "molo4nik11@gmail.com",
			subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Перезвонить надо еба)',
			html: newCallbackTmpl(body)
		}, function (err, info) {
			if (err) callback(err);

			res.json({
				message : 'ok'
			});
			
			transport.sendMail({
				from : "antonovphilipdev@gmail.com",
				to: "vladimirnovikovski@gmail.com",
				subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Перезвонить надо еба)',
				html: newCallbackTmpl(body)
			}, function (err, info) {
				if (err) callback(err);
			});
		});
	});


	router.post('/create_comment', function (req, res, next) {

		var body = req.body;

		console.log(body);

		transport.sendMail({
			from : "antonovphilipdev@gmail.com",
			to: "molo4nik11@gmail.com",
			subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Новый комментарий =)))',
			html: newCommentTmpl(body)
		}, function (err, info) {
			if (err) callback(err);

			res.json({
				message : 'ok'
			});
			
			transport.sendMail({
				from : "antonovphilipdev@gmail.com",
				to: "vladimirnovikovski@gmail.com",
				subject: 'К-К-КОНДОР МЕБЕЛЬ ||| Новый комментарий =)))',
				html: newCommentTmpl(body)
			}, function (err, info) {
				if (err) callback(err);
			});
		});
	});

	return router;
};

var MISC = {
	makeBreadCrumbs : function (categoryName, categorySlug, typeName, typeSlug) {
		if (arguments.length == 4) {
			return [
				{ name : 'Примеры работ', url : '/tovary' }, 
				{ name : categoryName, url : '/tovary/' + categorySlug },
				{ name : typeName, url : '/tovary/' + categorySlug + '/' + typeSlug }
			]
		} else if (arguments.length == 2) {
			return [
				{ name : 'Примеры работ', url : '/tovary' }, 
				{ name : categoryName, url : '/tovary/' + categorySlug }
			]
		}
	}
}
