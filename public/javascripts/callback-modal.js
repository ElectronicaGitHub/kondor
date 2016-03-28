$(function () {
	$(document).on('click', '#create_callback', function (e) {
		e.preventDefault();
		
		var btn = $(this);
		var data = btn.closest('form').serialize();

		btn.attr('disabled', true);

		btn.html('<i class="fa fa-spinner fa-spin"></i>');

		$.post('/create_callback', data, function (err, ok) {
			btn.hide(0);
			$('.mark').show(0);
			setTimeout(function () {
		 		$('#callbackModal').modal('hide');
		 	}, 600);
		});
	});
});