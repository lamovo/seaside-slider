define(['bean'], function(Event) {

return function(element, viewport) {
	
	var eventNamespace = '.swipe'  + +new Date(),
		threshold = 5,
		width = element.offsetWidth,
		start = {},
		prev = {},
		deltaX = 0,
		isScrolling,
		translateX = 0,
	
		self = {
			isFirst: false,
			isLast: false,
			
			destroy: function() {
				
				Event.remove(viewport, eventNamespace);
				
				return self;
			},
		},
		
		touchstart = function(event) {
			
			// get touch coordinates for delta calculations in onTouchMove
			start = {
				pageX: event.touches[0].pageX,
				pageY: event.touches[0].pageY,
			}
			
			// reset
			deltaX = 0;
			isScrolling = undefined;
			
			// get the current x position
			translateX = new WebKitCSSMatrix(element.style.webkitTransform).e;
			
			// disable transition while dragging
			element.classList.remove('transition');
		},
		
		touchmove = function(event) {
			
			// ensure swiping with one touch and not pinching
			if(event.touches.length > 1 || event.scale !== 1 || isScrolling) return;
			
			
			prev.deltaX = deltaX;
			deltaX = event.touches[0].pageX - start.pageX;
			
			
			// determine if scrolling test has run - one time test
			if(typeof isScrolling === 'undefined') isScrolling = Math.abs(deltaX) < Math.abs(/* deltaY-> */event.touches[0].pageY - start.pageY);
			
			
			if(!isScrolling) {
			
				// prevent scrolling
				event.preventDefault();
				
				// first and swipe right OR last and swipe left, increase resistance
				if((self.isFirst && deltaX > 0) || (self.isLast && deltaX < 0))
				deltaX = deltaX / (Math.abs(deltaX) / width + 1);
						
				// drag
				element.style.webkitTransform = 'translateX(' + (translateX + deltaX) + 'px)';
			}
		},
	
		touchend = function(event) {
			
			if(!isScrolling) {

				var isValidSwipe =
					// if left is equal to right, the swipe is pulled back
					Math.abs(prev.deltaX - deltaX) !== (Math.abs(prev.deltaX) - Math.abs(deltaX)) && (
					
						// acceleration greater than 5
						Math.abs(prev.deltaX - deltaX) > threshold
						
						// or deltaX greater than half of width
						|| Math.abs(deltaX) > width / 2
					);
					
				
				Event.fire(self, 'swipe', isValidSwipe ? (deltaX > 0 ? -1 : 1) : 0);
			}
			
			// enable transition after dragging
			element.classList.add('transition');
		};
	
	
	Event.add(viewport, 'touchstart' + eventNamespace, touchstart);
	Event.add(viewport, 'touchmove' + eventNamespace, touchmove);
	Event.add(viewport, 'touchend' + eventNamespace, touchend);
	
	
	return self;
}
	
});