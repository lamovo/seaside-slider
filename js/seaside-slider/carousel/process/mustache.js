define(['string-to-fragment', 'mote'], function(stringToFragment) {

return function(options) {

	return function(index, callback) {
		
		return stringToFragment(mote.compile(options.template)(options.data[index]));
	}
}

});