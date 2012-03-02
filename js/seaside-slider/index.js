define(['underscore'], function() {

return function(last, first) {

	var	prevCurr,
	
		self = {
			loop: false,
			removed: [],
			added: [],
			active: [],
			first: first || 0,
			last: last,
			span: last - (first || 0) + 1,
			
			back: [],
			
			set: function(index) {
				
				if(self.loop) {
					
					if(index > self.last) index = self.first;
					else if(index < self.first) index = self.last;
				}
				else {
				
					// clip index
					index = Math.max(index, self.first);
					index = Math.min(index, self.last);
				}
				
				// set indices
				self.prev = index - 1;
				self.curr = index;
				self.next = index + 1;
				
				// set active indices
				var active = [self.curr];
				self.prev < self.first || active.unshift(self.prev);
				self.next > self.last || active.push(self.next);
				
				// save to self
				self.removed = _.difference(self.active, active),
				self.added = _.difference(active, self.active);
				self.active = active;
				
				// direction
				if(prevCurr) self.direction = self.curr > prevCurr ? 1 : -1;
				prevCurr = self.curr;
				
				
				// keep a history of past indices
				self.back.unshift({
					prev: self.prev,
					curr: self.curr,
					next: self.next,
				});
				
				return self;
			},
		};
		
	
	return self;
}

});