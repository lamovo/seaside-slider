define(function() {

return function(callback, duration) {
	
	var id,
	
		self = {
			start: function() {
			
				// clear any ongoing interval
				if(id) clearInterval(id);
				
				id = setInterval(callback, duration);
				
				return self;
			},
			
			stop: function() {
				
				if(id) clearInterval(id);
				
				return self;
			},
			
			destroy: function() {
			
				return self.stop();
			},
		};
	
	return self;
}

});