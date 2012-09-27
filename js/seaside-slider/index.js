!function(factory) {
	
	if(typeof define === 'function' && define.amd) define(factory);
	else Index = factory();
}
(function() {

return function(last, first) {
	
	var	self = {
			version: '1.0.7',
			loop: false,
			removed: [],
			added: [],
			active: [],
			first: first || 0,
			last: last,
			span: last - (first || 0) + 1,
			back: [],
			
			set: function(index) {
				
				self.curr = clip(index);
				
				// set active indices
				var active = [self.curr];
				(self.prev = self.curr - 1) < self.first || active.unshift(self.prev);
				(self.next = self.curr + 1) > self.last || active.push(self.next);
				
				self.prev = clip(self.prev);
				self.next = clip(self.next);
				
				
				// save to self
				if(typeof _ === 'function') { // features only available with Underscore
				
					self.removed = _.difference(self.active, active),
					self.added = _.difference(active, self.active);
				}
				self.active = active;
				
				// direction
				if(self.back[0]) self.direction = self.curr > self.back[0].prev ? 1 : -1;
				
				// keep a history of past indices
				self.back.unshift({
					prev: self.prev,
					curr: self.curr,
					next: self.next,
				});
				
				return self;
			},
		},
		
		clip = function(index) {
			
			if(self.loop) {
				
				if(index > self.last) return self.first;
				else if(index < self.first) return self.last;
				else return index;
			}
			else return Math.min(Math.max(index, self.first), self.last);
		};
		
	
	return self;
}

});