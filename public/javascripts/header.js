$(function () {

	var slides = conf().slides,
		header_slides = conf().header_slides,
    	duration = 300;

	$('#js-menu-init').on('mouseover', function (e) {
		e.preventDefault();
		$('header').addClass('dropped');
	});
	$('#js-menu-init').on('mouseleave', function (e) {
		e.preventDefault();
		$('header').removeClass('dropped');
	});

    $('.menu .image').css({
		'background-image' : 'url("' + header_slides['shkafi'].src + '")'
	});

 	$('.menu ul li').hover(function () {
 		$('.last').removeClass('last');
 		var self = this, slide = $(self).closest('.menu').find('*[class*=-slide]'),
 			type = $(this).attr('data-goods-type');
 			console.log(type, header_slides[type]);
		var img = $('<div/>').addClass('image').css({
	 			'background-image' : 'url("' + header_slides[type].src + '")',
	 			opacity : 0
	 		}).appendTo('.image-wrapper');
	 		img.animate({
	 			opacity : 1
	 		}, duration)
 			.addClass('last');

		setTimeout(function () {
			$('header .image').not('.last').remove();
		}, duration);
	});

 	$('.js-init-callbackmodal').on('click', function (e) {
 		e.preventDefault();

 		$('#callbackModal').modal('show');
 	})
});