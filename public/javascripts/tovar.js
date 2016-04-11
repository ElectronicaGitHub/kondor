$(function () {
	var images = window.images;
	var image_container = $('.main-image');
	var mini_images_container = $('.mini-images-container');
	var mini_image_class = 'mini-image';
	var current_image, owl;
	(function init () {
		current_image = parseInt(window.number) - 1 < 0 ? 0 :  parseInt(window.number) - 1;
		console.log(current_image);
		createImages();

		owl = $(".owl-carousels-tovar").owlCarousel({
			dotsSpeed : 400,
			items : 1,
			smartSpeed : 250,
			startPosition : current_image,
			dotsContainer : $('.main-image .dots-nav')
		}).on('changed.owl.carousel', function(property) {
		    var current = property.item.index;
			$('.' + mini_image_class).removeClass('faded');
		    $('.' + mini_image_class).eq(current).addClass('faded');
		});
	})();

	$(document).on('click', '#offer-button', function (e) {
		var btn = $(this);
		e.preventDefault();
		var data = btn.closest('form').serialize();

		btn.attr('disabled', true);

		btn.html('<i class="fa fa-spinner fa-spin"></i>');

		$.post('/create_offer', data, function (err, ok) {
			setTimeout(function () {
				$('.offer-form').slideToggle(300);
				setTimeout(function () {
					$('.offer-form').hide(0);
					$('.after-offer-form').show(0);
				}, 400);
			}, 200);
		});
	});

	$(document).on('click', '.' + mini_image_class, function () {
		if ($(this).hasClass('faded')) return false;
		$('.' + mini_image_class).removeClass('faded');
		var n = $(this).attr('data-n');
		// owl.to(n);
		owl.trigger('to.owl.carousel', n);
		$(this).addClass('faded');
	});

	function createImages() {
		for (var i in images) {
			var bl = $('<div/>').addClass(mini_image_class).css({
				'background-image' : 'url("' + images[i].src + '")'
			}).attr('data-n', i).appendTo(mini_images_container);
			if (i == current_image) {
				bl.addClass('faded');
			}
		}
	}

	$(".k-form #phone").inputmask("+9 (999) 999 99 99", {
		oncomplete: function() {
			$('#offer-button').attr('disabled', false);
		}, 
		onincomplete: function () {
			$('#offer-button').attr('disabled', true);		
		}
	}).on('input', function () {
		$('#offer-button').attr('disabled', true);		
	});
});