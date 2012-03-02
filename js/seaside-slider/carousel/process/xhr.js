define(['bean', 'string-to-fragment'], function(Event, stringToFragment) {

return function(data, index, callback) {
		
	var xhr = new XMLHttpRequest(),
		fragment = document.createDocumentFragment();
	
	
	// use callback instead of Event.add to make it work in Opera
	xhr.onreadystatechange = function() {
		
		// complete
		if(xhr.readyState === 4) {
		
			if(data.selector) {
					
				var dummy = document.createElement('div');
					
				dummy.innerHTML = xhr.responseText;
				
				for(var i = 0, results = dummy.querySelectorAll(data.selector); i < results.length; i++) fragment.appendChild(results[i]);	
			}
			else fragment = stringToFragment(xhr.responseText);
			
			// free memory
			xhr = null;
			
			callback(fragment);
		}
	};
	
	xhr.open('get', data.url, true);
	xhr.send();
}

});