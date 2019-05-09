'use strict';

window.addEventListener('DOMContentLoaded', function () {
  let clock = document.querySelector('.timer');

  function formatTime(x) {
      if (x < 10) x = '0' + x;
      return x;
  }
  function startTime() {
      let date = new Date(),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

      hours = formatTime(hours);
      minutes = formatTime(minutes);
      seconds = formatTime(seconds);

      clock.innerHTML = hours + ":" + minutes + ":" + seconds;
  }
  setInterval(startTime, 1000);
  
});


