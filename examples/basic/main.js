require.config({
	baseUrl: '../../js',
	packages: ['seaside-slider'],
	paths: {
		'templates': '../templates',
		'text': 'plugins/text',
	},
});


require([
'bean',
'seaside-slider/seaside-slider',
'seaside-slider/slide-selectors',
'seaside-slider/sibling-slide-selector',
'seaside-slider/transitions/slide',
'seaside-slider/carousel/process/html',
'classList',
],
function(bean, SeasideSlider, SlideSelectors, SiblingSlideSelector, Transition, process) {
	
	var sliderElement = document.querySelector('.seaside-slider'),
		slides = sliderElement.querySelectorAll('section'),
		slider = SeasideSlider(sliderElement, {
			process: process({
				slides: slides,
			}),
			nSlides: slides.length,
		}),
		prevSlideSelector = SiblingSlideSelector(slider.element.querySelector('.prev')),
		nextSlideSelector = SiblingSlideSelector(slider.element.querySelector('.next'));
		slideSelectors = SlideSelectors(slider.element.querySelector('nav ul'), slider.carousel.index.span);
	
	// choose a transition
	Transition(slider.carousel);

	
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
		goto: function(index, slide) {
			
			slideSelectors.setCurrent(index);
			prevSlideSelector.disabled(index === slider.carousel.index.first);
			nextSlideSelector.disabled(index === slider.carousel.index.last);
		},
		
		load: function(index, slide) {
			
			slider.carousel.element.style.height = slide.offsetHeight + 'px';
		},
	});
});