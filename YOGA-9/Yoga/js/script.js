window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a)	{
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for(let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
 ////таймер
let deadline = 'May 16 2019 00:00:00 GMT+03:00';

function getTimeRemaining(endtime) {
let t = Date.parse(endtime) - Date.parse(new Date()),
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60),
		hours = Math.floor((t / (1000 * 60 * 60)));
			
		return {
			'total' : t,
			'seconds' : seconds,
			'minutes' : minutes,
			'hours' : hours
			};
}

function setClock(id, endtime) {
	let timer = document.getElementById(id),
		seconds = timer.querySelector('.seconds'),
		minutes = timer.querySelector('.minutes'),
		hours = timer.querySelector('.hours'),
		timeInterval = setInterval(updateClock,1000);
			
	function updateClock() {
		let t = getTimeRemaining(endtime);
		//добавляем нули и обрезаем если они лишние
				seconds.textContent = ('0' + t.seconds).slice(-2); 
				minutes.textContent = ('0' + t.minutes).slice(-2);
				hours.textContent = ('0' + t.hours).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeInterval);
			seconds.textContent = '00';
			minutes.textContent = '00';
			hours.textContent = '00';
		}
	}
//убираем первоначальную задержку в 1 секунду
	updateClock();  
}
setClock('timer', deadline);
});

//Модальное окно
//кнопка узнать больше
let more = document.querySelector('.more'),
	overlay = document.querySelector('.overlay'),
	close = document.querySelector('.popup-close');

more.addEventListener('click', function() {
	overlay.style.display = 'block';
	this.classList.add('more-splash');
	//запрещаем прокрутку страницы
	document.body.style.overflow = 'hidden';
	
});
// скрываем при нажатии на крестик
close.addEventListener('click', function() {
	overlay.style.display = 'none';
	more.classList.remove('more-splash');
	document.body.style.overflow = '';

});
// кнопка узнать подробнее, их много
let descBtn = document.querySelectorAll('.description-btn');

descBtn.forEach(function(item) {

	item.addEventListener('click', function() {
	overlay.style.display = 'block';
	this.classList.add('more-splash');
	document.body.style.overflow = 'hidden';
	});
});
