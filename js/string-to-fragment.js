// info: http://html5.org/specs/dom-parsing.html#dom-range-createcontextualfragment
define(function() {
	
return function(string) {
	
	if(typeof Range.prototype.createContextualFragment === 'function') {
		
		// try for Webkit which throws "Uncaught Error: NOT_SUPPORTED_ERR: DOM Exception 9"
		try {
			
			return document.createRange().createContextualFragment(string);
		}
		catch(error) {
			
			return fallback();
		}
	}
	else return fallback();
	
	function fallback() {
		
		var fragment = document.createDocumentFragment(),
			dummy = document.createElement('div');
			
		dummy.innerHTML = string;
		
		// append all childNodes to fragment
		while(dummy.firstChild) fragment.appendChild(dummy.firstChild);
		
		return fragment;
	}
}

});