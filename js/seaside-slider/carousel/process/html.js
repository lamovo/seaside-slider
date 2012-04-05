define(['string-to-fragment'], function(stringToFragment) {

return function(options) {
	
	// have to cache innerHTML for stupid Internet Explorer, who removes nodes from a nodelist when that nodelist is removed from the DOM
	for(var i = 0, cache = [], slides = _.toArray(options.slides); i < slides.length; i++) cache.push(options.slides[i].innerHTML);
	
	// empty slides
	options.slides[0].parentNode.innerHTML = '';
	
	
	return function(index, callback) {
		
		return stringToFragment(cache[index]);
	}
};

});