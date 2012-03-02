define(['seaside-slider/carousel/carousel', 'bean'], function(Carousel, Event) {

return function(element, options) {
	
	if(!_.isElement(element)) return false;
	
	var eventNamespace = '.seaside-slider'  + +new Date(),
		
		self = {
			element: element,
		
			options: {
				keyboardAccess:				true,
				startIndex:					0,
				touch:						Modernizr && Modernizr.touch,
				viewport:					element.querySelector('div'),
			},
			
			hide: function() {
				
				element.setAttribute('aria-hidden', element.ariaHidden = true);
				
				return self;
			},
			
			show: function() {
				
				element.setAttribute('aria-hidden', element.ariaHidden = false);
				
				return self;
			},
		
			destroy: function() {
				
				Event.remove(self.carousel, eventNamespace);
				
				_.each(self, function(property) {
					
					if(typeof property.destroy === 'function') property.destroy();
				});
				
				return self;
			},
		};
		
		
	if(options) self.options = _.defaults(options, self.options);

	
	self.carousel = Carousel(self.options.viewport.children[0], self.options.nSlides, self.options.process);
	
	
	// initialize
	Event.add(self, 'init' + eventNamespace, function() {
		
		// go to slide at start index
		self.carousel.goTo(self.options.startIndex);
		
		// communicate that transitions are welcome
		_.delay(self.carousel.enableTransition, 25);
	});
	
	
	if(self.options.touch)
	Event.add(self.carousel, 'goto', function(index) {
		
		// let swipe now it's the first or last slide so it can increase resistence
		self.swipe.isFirst = (index === self.carousel.index.first);
		self.swipe.isLast = (index === self.carousel.index.last);
	});
	
	
	
	/*
	Load optional modules
	---------- */
	
	require([
	self.options.keyboardAccess	&& 'seaside-slider/keyboard-access',
	self.options.touch && 'seaside-slider/swipe',
	],
	function(KeyboardAccess, Swipe) {
		
		// keyboard access
		if(KeyboardAccess)
		Event.add(self.keyboardAccess = KeyboardAccess(element), 'key' + eventNamespace, function(direction) {
			
			self.carousel.goTo(self.carousel.index.curr + direction);
		});
		
		// swipe
		if(Swipe)
		Event.add(self.swipe = Swipe(self.carousel.element, self.options.viewport), 'swipe' + eventNamespace, function(direction) {
			
			self.carousel.goTo(self.carousel.index.curr + direction);
		});
		
		
		_.defer(function() {
			
			Event.fire(self, 'init' + eventNamespace);
		});
	});
	
	
	return self;
};

});