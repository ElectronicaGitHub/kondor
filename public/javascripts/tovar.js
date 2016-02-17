$(function () {
	var images = window.images;
	var image_container = $('.main-image');
	var mini_images_container = $('.mini-images-container');
	var mini_image_class = 'mini-image';
	var current_image;
			

	(function init () {
		current_image = Number(window.location.hash[1]) - 1 || 0;
		image_container.css({
			'background-image' : 'url(' + images[current_image].src + ')'
		});
		createImages();
	})();

	$(document).on('click', '.' + mini_image_class, function () {
		if ($(this).hasClass('faded')) return false;
		$('.' + mini_image_class).removeClass('faded');
		var n = $(this).attr('data-n');
		image_container.css({
			'background-image' : 'url(' + images[n].src + ')'
		});
		$(this).addClass('faded');
	});

	function createImages() {
		for (var i in images) {
			var bl = $('<div/>').addClass(mini_image_class).css({
				'background-image' : 'url(' + images[i].src + ')'
			}).attr('data-n', i).appendTo(mini_images_container);
			if (i == current_image) {
				bl.addClass('faded');
			}
		}
	}
})