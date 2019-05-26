function timer() {
let deadline = 'May 30 2019 07:00:00 GMT+03:00';

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

}
module.exports = timer;