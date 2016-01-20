$(function () {
	console.log('header script');

	$('#js-menu-init').on('mouseover', function (e) {
		e.preventDefault();
		$('header').addClass('dropped');
	});
	$('#js-menu-init').on('mouseleave', function (e) {
		e.preventDefault();
		$('header').removeClass('dropped');
	});

	var slides = [
        { src : "http://www.mspaintart.com/i/2016/01/Breathtaking-wooden-bedroom-furniture-ideas-with-white-painted-wall-also-ball-white-table-lamp-on-covered-flooring.jpg" },
        { src : "http://chicdecoration.com/wp-content/uploads/2015/05/kitchen-interior-furniture-simple-natural-wooden-low-cabinet-countertop-and-sticking-wall-natural-wooden-cabinet-great-idea-of-inspiring-contemporary-kitchen-cabinet-designs-versatile.jpg"},
        { src : "http://www.lotusfolie.com/wp-content/uploads/2015/10/furniture-kitchen-traditional-square-wooden-dining-table-set-next-to-wooden-divider-built-in-kitchen-cabinet-on-dark-brown-wooden-floor-small-apartment-kitchen-table-set-interior-ideas.jpg"},
        { src : "http://www.mayobiz.com/wp-content/uploads/2015/08/Rustic-Style-Home-Office-Desk-Interior-Sets-with-Rectangular-Shape-Brown-Wooden-Table-plus-Unique-Cream-Wooden-Ottoman-plus-Single-White-Chair-plus-Gray-Wall-Paint-and-White-Flooring-Ideas.jpg"}
    ],
    duration = 300;
    // currentZ = 1;

    $('.menu .image').css({
 			'background-image' : 'url(' + slides[0].src + ')'
 		});

 	$('.menu ul li').hover(function () {
 		$('.last').removeClass('last');
 		var index = $(this).index() % slides.length,
 			self = this, slide = $(self).closest('.menu').find('*[class*=-slide]');

 		var img = $('<div/>').addClass('image').css({
 			'background-image' : 'url(' + slides[index].src + ')',
 			opacity : 0
 		}).appendTo('.image-wrapper');
 		img.animate({
 			opacity : 1
 		}, duration)
 			.addClass('last');

		setTimeout(function () {
	 		$('.image').not('.last').remove();
		}, duration);
 		// slide.addClass('slided');
 		// setTimeout(function () {
	 	// 	$('.menu .image').css({
	 	// 		'background-image' : 'url(' + slides[index].src + ')'
	 	// 	});
		 // 	slide.removeClass('slided');
 		// }, duration);

 	})

})