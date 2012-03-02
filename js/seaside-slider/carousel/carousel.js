define(['bean', 'seaside-slider/index', 'underscore'], function(Event, Index) {

return function(element, nSlides, process) {

	var cache = [],
		processed = [],
		slideElement = document.createElement('section'),
		
		self = {
			index: Index(nSlides - 1),
			element: element,
			removeSlideDelay: 1000,
			
			goTo: function(index) {
				
				// update index
				self.index.set(index);
					
				// add element for current
				var slide = cache[self.index.curr] || (cache[self.index.curr] = slideElement.cloneNode(false));
				
				// delay for performance on mobile devices
				setTimeout(function() {
					
					for(var i = 0, added = self.index.added; i < added.length; i ++) add(added[i]);
					for(var i = 0, removed = self.index.removed; i < removed.length; i ++) remove(removed[i]);
				},
				25);

				
				Event.fire(self, 'goto', [self.index.curr, slide]);

				
				return self;
			},
			
			disableTransition: function() {
				
				element.classList.remove('transition');
				
				return self;
			},
			
			enableTransition: function() {
				
				element.classList.add('transition');
				
				return self;
			},
			
			markCurrentSlide: function() {
				
				if(self.index.back[1]) cache[self.index.back[1].curr].classList.remove('current');
				cache[self.index.curr].classList.add('current');
				
				return self;
			},
		},
		
		add = function(index) {

			// load from cache or save to cache
			var slide = cache[index] || (cache[index] = slideElement.cloneNode(false));
			
			
			if(!processed[index]) {
				
				var fragment = process(index, function(fragment) {
					
					// 1. asynchronous via callback
					slide.appendChild(fragment);
				});
				
				// 2. synchronous
				if(fragment && fragment.nodeType && fragment.nodeType === 11) slide.appendChild(fragment);
				
				processed[index] = true;
			}
			
			// append slide
			element.appendChild(slide);
			
			
			Event.fire(self, 'add', [index, slide]);
		},
		
		remove = function(index) {
			
			// set timeout to give the slide time to transition out
			setTimeout(function() {
				
				// make sure that after the timeout, the index to be removed is not one of the active indices
				if(_.indexOf(self.index.active, index) === -1) {
					
					var slide = cache[index];
					
					// sometimes, the carousel goes very fast and there is no node to be removed
					// parentNode for slide is always gonna be the slides container when inserted and undefined when not inserted
					if(slide && slide.parentNode) element.removeChild(slide);
					
					
					Event.fire(self, 'remove', [index, slide]);
				}
			},
			self.removeSlideDelay);
		};

	
	return self;
}

});