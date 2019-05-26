function form() {
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
}
  module.exports = form;  

