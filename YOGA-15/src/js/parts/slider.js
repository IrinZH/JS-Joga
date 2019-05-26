function slider() {

let 
	slides = document.querySelectorAll('.slider-item'),
	// slideIndex = 1,
	slideIndex = Math.floor(Math.random() * slides.length) + 1, //рандомный индекс слайда
	prev = document.querySelector('.prev'),
	next = document.querySelector('.next'),
	dotsWrap = document.querySelector('.slider-dots'),
	dots = document.querySelectorAll('.dot');

showSlides(slideIndex);


function showSlides(n) {
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	slides.forEach(item => {
		item.style.display = 'none'
	});
	dots.forEach(item => {
		item.classList.remove('dot-active')
	});

	slides[slideIndex - 1].style.display = 'block';
	dots[slideIndex - 1].classList.add('dot-active');
}

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

prev.addEventListener('click', () => {
	plusSlides(-1);
});

next.addEventListener('click', () => {
	plusSlides(1);
});

dotsWrap.addEventListener('click', event => {
	dots.forEach((item, index) => {
		if (event.target && event.target == item) {
			currentSlide(index + 1);
		}
	});
});
}
module.exports = slider;