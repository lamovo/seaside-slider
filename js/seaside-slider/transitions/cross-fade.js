define(['bean'], function(Event) {

return function(carousel) {
	
	Event.add(carousel, 'goto', function() {
		
		carousel.markCurrentSlide();
	});
};

});