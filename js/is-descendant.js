define(function() {
	
return function(ancestor, descendant) {

	var hasId = descendant.hasAttribute('id');
	
	// add temporary id
	if(!hasId) descendant.setAttribute('id', 'temp' + +new Date());
	
	// query the id against the ancestor
	var result = ancestor.getElementById(descendant.getAttribute('id'));
	
	// remove temporary id
	if(!hasId) descendant.removeAttribute('id');
	
	return result !== null;
}

});