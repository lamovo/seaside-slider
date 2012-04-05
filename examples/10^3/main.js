require.config({
	baseUrl: '../../js',
	packages: ['seaside-slider'],
	paths: {
		'templates': '../templates',
		'text': 'plugins/text',
	},
});


// from: http://stackoverflow.com/a/7228322/278337
function randomBetween(a, b) {
	
	return Math.floor(Math.random() * (b - a + 1) + a);
}


require([
'bean',
'seaside-slider/seaside-slider',
'seaside-slider/slide-selectors',
'seaside-slider/sibling-slide-selector',
'seaside-slider/auto-slide',
'seaside-slider/transitions/slide',
'seaside-slider/carousel/process/mustache',
'text!templates/seaside-slider/10^3.html',
'classList',
],
function(bean, SeasideSlider, SlideSelectors, SiblingSlideSelector, AutoSlide, Transition, process, template) {
	
	// create slides array
	for(var i = 0, data = []; i < 1000; i++)
	data.push({
		url: 'http://lorempixel.com/1000/' + randomBetween(100, 1000) + '/',
		//url: 'lorempixel.php?n=' + i,
		caption: 'Slide ' + (i + 1),
	});
	
	
	var slider = SeasideSlider(document.querySelector('.seaside-slider'), {
			process: process({
				data: data,
				template: template,
			}),
			nSlides: data.length,
		}),
		prevSlideSelector = SiblingSlideSelector(slider.element.querySelector('.prev')),
		nextSlideSelector = SiblingSlideSelector(slider.element.querySelector('.next')),
		slideSelectors = SlideSelectors(slider.element.querySelector('nav ul'), slider.carousel.index.span),
		autoSlide = AutoSlide(function() {
					
			slider.carousel.goTo(slider.carousel.index.next);
		},
		1000)
		//.start();
	
	// choose a transition
	Transition(slider.carousel)
	
	
	bean.add(prevSlideSelector.element, 'click', function() {
		
		slider.carousel.goTo(slider.carousel.index.prev);
	});
	
	bean.add(nextSlideSelector.element, 'click', function() {
		
		slider.carousel.goTo(slider.carousel.index.next);
	});
	
	bean.add(slideSelectors.element, slideSelectors.slideSelectors, 'click', function(event) {
		
		slider.carousel.goTo(_.indexOf(slideSelectors.slideSelectors, event.target));
	});
	
	bean.add(slider.carousel, {
		goto: function(index) {
		
			slideSelectors.setCurrent(index);
			prevSlideSelector.disabled(index === slider.carousel.index.first);
			nextSlideSelector.disabled(index === slider.carousel.index.last);
		},
		
		load: function(index, slide) {
			
			slider.carousel.element.style.height = slide.offsetHeight + 'px';
		},
	});
	
	//bean.add(slider.element, 'focus', autoSlide.stop);
	//bean.add(slider.element, 'blur', autoSlide.start);	
});