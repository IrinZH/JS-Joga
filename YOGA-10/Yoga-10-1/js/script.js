//1) Привести свой проект в соответствие с ES6 (в проекте Yoga, то, что можно преобразовать)

window.addEventListener('DOMContentLoaded', () => {   // window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

		const hideTabContent = (a) => {                       //function hideTabContent(a)	{
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	};

	hideTabContent(1);

	const showTabContent = (b)	=> {														//function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	};

	info.addEventListener('click', (event) => {      //info.addEventListener('click', function (event) {
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
let deadline = 'May 29 2019 07:00:00 GMT+03:00';

const getTimeRemaining = (endtime) => {      //function getTimeRemaining(endtime) {
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
};

const setClock = (id, endtime) => {      // function setClock(id, endtime) {
		let timer = document.getElementById(id),
		seconds = timer.querySelector('.seconds'),
		minutes = timer.querySelector('.minutes'),
		hours = timer.querySelector('.hours');
					
		const updateClock = () => {        // function updateClock() {               
		let t = getTimeRemaining(endtime);
		//добавляем нули и обрезаем если они лишние...а еще типа интерполяция
				seconds.textContent = (`0${t.seconds}`).slice(-2);    //seconds.textContent = ('0' + t.seconds).slice(-2); 
				minutes.textContent = (`0${t.minutes}`).slice(-2);    //minutes.textContent = ('0' + t.minutes).slice(-2);
		//часы у нас могут быть 3-х и более значным числом, так что slice(-2) не подходит
				if (t.hours<10)	{
				hours.textContent = (`0${t.hours}`);   //hours.textContent = ('0' + t.hours);
				}
				if (t.hours>=10) {
				hours.textContent = t.hours;
				}
		
		if (t.total <= 0) {
			clearInterval(timeInterval);
			seconds.textContent = '00';
			minutes.textContent = '00';
			hours.textContent = '00';
		}
	};
	let timeInterval = setInterval(updateClock,1000);
	updateClock();   //убираем первоначальную задержку в 1 секунду
};
setClock('timer', deadline);
});


// Модальное окно от сонсеннима

let overlay = document.querySelector('.overlay'),
isActiveBtn;


const bindModal = (overlayStatus, overflowStatus, classListMethod, el) => {
if(classListMethod == 'add') isActiveBtn = el;
if(!el) el = isActiveBtn;
overlay.style.display = overlayStatus;
el.classList[classListMethod]('more-splash');
document.body.style.overflow = overflowStatus;
};


document.body.addEventListener('click', event => {
let target = event.target;

if(target.classList.contains('more') || target.classList.contains('description-btn')) bindModal('block', 'hidden', 'add', target);
if(target.classList.contains('popup-close')) bindModal('none', '', 'remove');
console.log(target);
});

//Модальное окно пробы по другому чуть сделать
//оставила переменные для наглядности
//самое сложное - именно в добавлении и удалении класса more-splash
/* let more = document.querySelector('.more'), //кнопка узнать больше
			overlay = document.querySelector('.overlay'), //модальное окно
			close = document.querySelector('.popup-close'), //кнопка закрытие модального окна
			descBtn = document.querySelectorAll('.description-btn'),// кнопка узнать подробнее, их много
			isActiveBtn;//кнопка которая была активной при добавлении classList.add('more-splash') 
			
	const bindModal = (overlayStatus, overflowStatus, classListMethod, el) => {
		if(classListMethod == 'add') isActiveBtn = el;
		if(!el) el = isActiveBtn;
		overlay.style.display = overlayStatus;
		el.classList[classListMethod]('more-splash'); //добавляем класс для срабатывания анимации на клик кнопки или убираем  класс кнопки на которую нажимали ранее при клике на закрытие модального
		document.body.style.overflow = overflowStatus;
	};


	document.body.addEventListener('click', event => {
		let target = event.target;
		for (let i = 0; i < descBtn.length; i++) {
			if(target == more || target == descBtn[i]) bindModal('block', 'hidden', 'add', target);
			
			if(target == close) bindModal('none', '', 'remove');
		}
		console.log(target);
		
});
 */



