$(function () {

	var color = "#ffcd34",
		slides = conf().slides;
	$(".image-panel").vegas({
		walk : function () {
			$(".vegas-timer-progress").css("backgroundColor", color);
		},
		delay : 4000,
	    slides: slides
	    // overlay: '/libs/vegas/dist/overlays/07.png'
	});

	// $(".owl-carousels").owlCarousel({
	// 	slideSpeed : 300,
	// 	paginationSpeed : 400,
	// 	singleItem:true
 //  	});
});