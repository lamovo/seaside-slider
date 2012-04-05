define(['bean'], function(bean) {

return function(carousel) {

	var self = {
			checkLoadables: function(slide) {
				
				console.log(slide.querySelectorAll('iframe, img, video'));
				
				for(var i = 0, loadablesLoaded = 0, loadables = slide.querySelectorAll('iframe, img, video'); i < loadables.length; i++)
				bean.add(loadables[i], 'load', function() {
					
					loadablesLoaded ++;
					
					if(loadablesLoaded === loadables.length) self.to(slide);
				});
			},
			
			to: function(slide) {
			
				carousel.element.style.height = slide.offsetHeight + 'px';
			},
		};
		
		
	return self;
}

});