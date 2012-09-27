define(['bean'], function(Event) {

return function(carousel) {
	
	var self = {
			gutter: 20,
			transform:					Modernizr && Modernizr.csstransforms && Modernizr.touch, // use CSS3 transforms only on touch devices where Flash isn't supported because http://dropshado.ws/post/4085720152/css-transforms-breaking-flash
			transformPropertyName:		Modernizr && Modernizr.prefixed('transform'),
		},
		
		// get the right property and value, used to move a slide
		property = self.transform ? self.transformPropertyName : 'marginLeft',
		valuePrefix = self.transform ? 'translateX(' : '';
		valueSuffix = self.transform ? 'px)' : 'px';
	
	function positionSlide(index, slide) {

		var slideSpan = carousel.element.offsetWidth + self.gutter;

		slide.style.left = index * slideSpan + 'px';
	}

	function positionViewport(index) {

		var slideSpan = carousel.element.offsetWidth + self.gutter;

		// move slide along x-axis
		carousel.element.style[property] = valuePrefix + (- index * slideSpan) + valueSuffix;
	}

	Event.add(carousel, 'goto', positionViewport);
	Event.add(carousel, 'add', positionSlide);
	Event.add(window, 'resize', function() {

		for(var i = 0; i < carousel.index.active.length; i++) positionSlide(carousel.index.active[i], carousel.cache[carousel.index.active[i]]);

		carousel.goTo(carousel.index.curr);
	});
	
	return self;
};

});