define(['string-to-fragment'], function(stringToFragment) {

return function(options) {
		
	options.slides[0].parentNode.innerHTML = '';
	
	
	return function(index, callback) {
		
		return stringToFragment(options.slides[index].innerHTML);
	}
};

});