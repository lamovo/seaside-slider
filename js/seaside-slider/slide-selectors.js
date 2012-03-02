define(['string-to-fragment', 'text!templates/seaside-slider/slide-selector.html', 'mote', 'underscore'], function(stringToFragment, template) {

return function(element, slideSelectors) {
	
	var prevCurrent,
	
		self = {
			element: element,
		
			create: function(amount) {
				
				for(var i = 0, result = ''; i < amount; i++) result += mote.compile(template)({index: i});

				element.appendChild(stringToFragment(result));
				
				return element.children;
			},
			
			setCurrent: function(index) {
				
				if(prevCurrent) prevCurrent.classList.remove('current');
				(prevCurrent = self.slideSelectors[index]).classList.add('current');
				
				return self;
			},
		};
		
	
	if(typeof slideSelectors === 'number') slideSelectors = self.create(slideSelectors);
	
	self.slideSelectors = slideSelectors = _.toArray(slideSelectors);
		
	return self;
}

});