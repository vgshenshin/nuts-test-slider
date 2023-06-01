'use strict';

const slides = document.querySelectorAll('.slider__item'),
		slider = document.querySelector('.slider-content'),
		prev = document.querySelectorAll('.slider-prev'),
		next = document.querySelectorAll('.slider-next');


let slideIndex = 0; 

for(let i = slides.length; i > 0; i--) {

	let div = document.createElement('span');
	div.classList.add('slider-dot');
	document.querySelector('.slider__line').append(div);

}

for(let i = slides.length; i > 0; i--) {

	let div = document.createElement('span');
	div.classList.add('slider-dot_small');
	document.querySelector('.slider__line_small').append(div);

}

setActiveSlide(slideIndex);
	
let autoSlide = setInterval(() => {
	nextSlide();
}, 4000);

next.forEach(btn => btn.addEventListener('click', () => {
	nextSlide();
}));

prev.forEach(btn => btn.addEventListener('click', () => {
	prevSlide();
}));


function nextSlide() {

	if (slideIndex == slides.length-1) {
		slideIndex = 0;
	} else {
		slideIndex++;
	}

	setActiveSlide(slideIndex);
	sliderRightMove();
}

function prevSlide() {

	if (slideIndex == 0) {
		slideIndex = slides.length-1;
	} else {
		slideIndex--;
	}

	setActiveSlide(slideIndex);
	sliderLeftMove();

}

function setActiveSlide(slideIndex) {

	slides.forEach(slide => slide.classList.remove('active'))
	slides[slideIndex].classList.add('active')

	const dots = document.querySelectorAll('.slider-dot');
	dots.forEach(dot => dot.classList.remove('slider-dot-active'));
	dots[slideIndex].classList.add('slider-dot-active');

	const dotsSmall = document.querySelectorAll('.slider-dot_small');
	dotsSmall.forEach(dot => dot.classList.remove('slider-dot-active'));
	dotsSmall[slideIndex].classList.add('slider-dot-active');
}

function sliderRightMove() {
	const activeSlide = document.querySelector('.active');
	slider.scrollLeft += (activeSlide.getBoundingClientRect().right - slider.getBoundingClientRect().right) + 1;
}

function sliderLeftMove() {
	const activeSlide = document.querySelector('.active');
	slider.scrollLeft += (activeSlide.getBoundingClientRect().left - slider.getBoundingClientRect().left) - 1;
}

// mobile 

if(document.documentElement.clientWidth < 769) {
	
	next.forEach(btn => btn.addEventListener('touchstart', () => {
		btn.style.background = '#C8D9FB';
	}));
	
	prev.forEach(btn => btn.addEventListener('touchstart', () => {
		btn.style.background = '#C8D9FB';
	}));
	next.forEach(btn => btn.addEventListener('touchend', () => {
		btn.style.background = '';
	}));
	
	prev.forEach(btn => btn.addEventListener('touchend', () => {
		btn.style.background = '';
	}));

	// mobile scroll
	
	let touch = false;
	let startX;
	let scrollLeft;
	
	slider.addEventListener('touchstart', (e) => {
		touch = true;
		startX = e.touches[0].pageX;
		scrollLeft = slider.scrollLeft;
	});
	
	slider.addEventListener('touchend', () => {
		touch = false;
	});
	
	slider.addEventListener('touchmove', (e) => {
		if (!touch) return;
	
		e.preventDefault();

		const finishX = e.touches[0].pageX;
		const scroll = finishX - startX;
		slider.scrollLeft = scrollLeft - scroll;
	});
}