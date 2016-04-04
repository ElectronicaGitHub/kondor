$(function () {

	var color = "#ffcd34",
		slides = conf().slides,
		n = -1;
	$(".image-panel").vegas({
		walk : function () {
			$(".vegas-timer-progress").css("backgroundColor", color);
			$('.adverticement').addClass('out');
			n = n + 1 >= adverticements.length ? 0 : n + 1;
			setTimeout(function () {
				$('.adverticement').text(adverticements[n].text);
				$('.adverticement').removeClass('out');
			}, 300);
		},
		init : function () {
			var el = $('<div/>').addClass('adverticement out').text(adverticements[0].text);
			// console.log($('.image-panel-wrapper'));
			$('.image-panel-wrapper').append(el);
		},
		delay : 2500,
	    slides: slides
	    // overlay: '/libs/vegas/dist/overlays/07.png'
	});

	$(".owl-carousels").owlCarousel({
		dotsSpeed : 400,
		items : 1,
		smartSpeed : 250,
		lazyLoad : true
  	});
});

var adverticements = [
	{ text : 'Выезд замерщика бесплатно' },
	{ text : 'Уникальный дизайн каждого изделения' },
	{ text : 'Надежность гарантируется' },
	{ text : 'Изготовление от 14 дней' }
];