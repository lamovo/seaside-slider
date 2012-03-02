define(['bean', 'is-descendant'], function(Event, isDescendant) {

return function(element) {
	
	var eventNamespace = '.keyboardaccess' + +new Date(),
	
		self = {
			destroy: function() {
			
				bean.remove(document, eventNamespace);
				
				return self;
			},
		};
	
	
	element.setAttribute('tabindex', 0);
	
	
	Event.add(element, 'keydown' + eventNamespace, function(event) {
		
		if(element === document.activeElement || isDescendant(element, document.activeElement)) {
		
			var direction = {
			37: -1,
			39: +1,
			}[event.keyCode];
			
			if(direction) {
				
				event.preventDefault();
				
				Event.fire(self, 'key', direction);
			}
		}
	});
	
	
	return self;
}

});