/* 2) Используя синтаксис ES6 в отдельном документе:

·        Создать класс options

·        Он должен содержать свойства: height, width, bg, fontSize, textAlign

·        Он должен содержать метод, создающий новый div на странице, записывающий в него любой текст и при помощи cssText изменять свой стиль из переданных параметров

·        Создать новый объект через класс

·        Вызвать его метод и получить элемент на странице

3) Проверить, чтобы все работало и не было ошибок в консоли

4) Добавить папку с уроком на GitHub */
//'use strict';

window.addEventListener('DOMContentLoaded', () => {
  class Options {
		constructor(height = '', width = '', bg = '', fontSize = '', textAlign = '') {
			this.height = height;
			this.width = width;
			this.bg = bg;
			this.fontSize = fontSize;
			this.textAlign = textAlign;
    }
    createDiv(text){
      let div = document.createElement('div');
      div.style.cssText = `height: ${this.height}; width: ${this.width}; background-color: ${this.bg}; font-size: ${this.fontSize}; text-align: ${this.textAlign}`;
      document.body.appendChild(div);
      div.innerHTML = text;
    }  
  }
  let newDiv = new Options(`100px`, `100%`, `pink`, `28px`, `center`);
  newDiv.createDiv('Привет!');
  newDiv = new Options(`100px`, `100%`, `lightgray`, `26px`, `center`);
  newDiv.createDiv('Hello world!');
  newDiv = new Options(`100px`, `100%`, `lightblue`, `24px`, `center`);
  newDiv.createDiv('Мир, труд, май!');
  newDiv = new Options(`100px`, `100%`, `beige`, `22px`, `center`);
  newDiv.createDiv('');

});
  

