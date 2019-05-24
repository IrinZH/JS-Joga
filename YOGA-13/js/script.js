window.addEventListener('DOMContentLoaded', () => { // window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	const hideTabContent = (a) => { //function hideTabContent(a)	{
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	};

	hideTabContent(1);

	const showTabContent = (b) => { //function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	};

	info.addEventListener('click', (event) => { //info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
	////таймер
	let deadline = 'May 29 2019 07:00:00 GMT+03:00';

	const getTimeRemaining = (endtime) => { //function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			'total': t,
			'seconds': seconds,
			'minutes': minutes,
			'hours': hours
		};
	};

	const setClock = (id, endtime) => { // function setClock(id, endtime) {
		let timer = document.getElementById(id),
			seconds = timer.querySelector('.seconds'),
			minutes = timer.querySelector('.minutes'),
			hours = timer.querySelector('.hours');

		const updateClock = () => { // function updateClock() {               
			let t = getTimeRemaining(endtime);
			//добавляем нули и обрезаем если они лишние...а еще типа интерполяция
			seconds.textContent = (`0${t.seconds}`).slice(-2); //seconds.textContent = ('0' + t.seconds).slice(-2); 
			minutes.textContent = (`0${t.minutes}`).slice(-2); //minutes.textContent = ('0' + t.minutes).slice(-2);
			//часы у нас могут быть 3-х и более значным числом, так что slice(-2) не подходит
			if (t.hours < 10) {
				hours.textContent = (`0${t.hours}`); //hours.textContent = ('0' + t.hours);
			}
			if (t.hours >= 10) {
				hours.textContent = t.hours;
			}

			if (t.total <= 0) {
				clearInterval(timeInterval);
				seconds.textContent = '00';
				minutes.textContent = '00';
				hours.textContent = '00';
			}
		};
		let timeInterval = setInterval(updateClock, 1000);
		updateClock(); //убираем первоначальную задержку в 1 секунду
	};
	setClock('timer', deadline);

	// Модальное окно от сонсеннима

	let overlay = document.querySelector('.overlay'),
		isActiveBtn;

	const bindModal = (overlayStatus, overflowStatus, classListMethod, el) => {
		if (classListMethod == 'add') isActiveBtn = el;
		if (!el) el = isActiveBtn;
		overlay.style.display = overlayStatus;
		el.classList[classListMethod]('more-splash');
		document.body.style.overflow = overflowStatus;
	};

	document.body.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('more') || target.classList.contains('description-btn')) bindModal('block', 'hidden', 'add', target);
		if (target.classList.contains('popup-close')) bindModal('none', '', 'remove');
		statusMessage.innerHTML = ""; //при закрытии модального окна очищаем статусмесседж
		// console.log(target);
	});

	//Отправка формы //обязательно name нужен в html для отправки данных формы

	// валидация номера телефона
	document.body.addEventListener("input", event => {
		if (event.target.getAttribute("type") === "tel") {
			event.target.value = "+" + event.target.value.replace(/[^0-9]/g, "").slice(0, 11);
			if (event.target.value.length == 1) {
        event.target.value = "";
			}
		}
	});

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с Вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};
	
	let statusMessage = document.createElement('div');
	statusMessage.classList.add('status');


	let sendForm = (form) => {
		form.appendChild(statusMessage);
		let input = form.querySelectorAll('input');
		let formData = new FormData(form);

		function postData() {
			return new Promise((resolve,reject)=>{
				let request = new XMLHttpRequest();
				request.open('POST', 'server.php');
				request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
				// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						resolve();
					} else if(request.readyState === 4) {
						if(request.status == 200 && request.status < 300) {
							resolve();
							console.log("данные формы отправлены");
						}
						else {
							reject();
						}
					} 
				};
				let obj = {};
				formData.forEach((value, key) => {
				obj[key] = value;
				});
				let json = JSON.stringify(obj);
				request.send(json);
				// request.send(formData);
				console.log(json);
			});
		}
		
		let clearInput = () => {
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}
	
		postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.then(clearInput);
		};

	document.body.addEventListener('submit', (event) => { //submit вешается на форму, а не на кнопку, в данном случае на обезличенный документ!!!!
		// if (event.target.className == "main-form" || event.target.id == "form") { //в данном случае можно без условия на определенные формы
			event.preventDefault(); //отмена действия браузера по умолчанию при нажатии на кнопку
			sendForm(event.target);
			setTimeout(() => {  ///очистка статусмесседжа через 3 секунды после отправки формы
        statusMessage.innerHTML = "";
      }, 3000);
		// }
	});
});

// Слайдер

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

//калькулятор
let persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function() {
		this.value = this.value.replace(/[\D]|^0/g, '');
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if(persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total * place.options[place.selectedIndex].value;
		}
	});

	restDays.addEventListener('input', function() {
		this.value = this.value.replace(/[\D]|^0/g, '');
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if(persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total * place.options[place.selectedIndex].value;
		}
	});
	//функция для выбора из выпадающего списка баз
	place.addEventListener('change', function() {
		if(persons.value == '' || restDays.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
