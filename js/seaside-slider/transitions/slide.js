define(['bean'], function(Event) {

return function(carousel) {
	
	var self = {
			gutter: 20,
			transform:					Modernizr && Modernizr.csstransforms && Modernizr.touch, // use CSS3 transforms only on touch devices where Flash isn't supported because http://dropshado.ws/post/4085720152/css-transforms-breaking-flash
			transformPropertyName:		Modernizr && Modernizr.prefixed('transform'),
		},
		
		slideSpan = carousel.element.offsetWidth + self.gutter,
		// get the right property and value, used to move a slide
		property = self.transform ? self.transformPropertyName : 'marginLeft',
		valuePrefix = self.transform ? 'translateX(' : '';
		valueSuffix = self.transform ? 'px)' : 'px';
	
	
	Event.add(carousel, 'goto', function(index) {
		
		// move slide along x-axis
		carousel.element.style[property] = valuePrefix + (- index * slideSpan) + valueSuffix;
	});
	
	Event.add(carousel, 'add', function(index, slide) {
		
		slide.style.left = index * slideSpan + 'px';
	});
	
	
	return self;
};

});