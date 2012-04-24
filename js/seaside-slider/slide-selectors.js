define(['string-to-fragment', 'text!templates/seaside-slider/slide-selectors.html', 'mote', 'underscore'], function(stringToFragment, template) {

return function(element, slideSelectors) {
	
	var prevCurrent,
	
		self = {
			element: element,
		
			create: function(amount) {
				
				for(var i = 0, slideSelectors = []; i < amount; i++) slideSelectors.push({index: i});
				
				var fragment = stringToFragment(mote.compile(template)({slideSelectors: slideSelectors}));
				
				slideSelectors = fragment.querySelectorAll('li');
				
				element.appendChild(fragment);
				

				return slideSelectors;
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