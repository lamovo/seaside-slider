define(function() {

return function(element) {
	
	var isButton = element.nodeName.toLowerCase() === 'button',
		
		self = {
			element: element,
		
			disabled: function(boolean) {
				
				element[isButton ? 'disabled' : 'ariaDisabled'] = boolean;
				
				return self;
			},
		};
	
	
	return self;
}
	
});