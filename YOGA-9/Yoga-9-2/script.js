
let age = document.getElementById('age');

age.addEventListener("input", function () {
  age.value = age.value.replace(/[^0-9+]/, '');
});
// Вводить можно только цифры

function showUser(surname, name) {
  alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

age.addEventListener('change', function () {
  showUser.call(age, 'Smith', 'John');
});

//событие blur – когда фокус исчезает
// age.addEventListener('blur', function () {
//   showUser.call(age, 'Smith', 'John');
// });


// по тесту к Бонус уроку №2 - https://learn.javascript.ru/quiz/js-basic

/* let a = (1,5 - 1) * 2;
alert(a); */
//почему 8?)))

//  console.log(true + false);
 //почему 1?))

//  console.log(2 && 1 && null && 0 && undefined);
 //null ответ


/*  let arr = [];
arr[1] = 1;
arr[3] = 33;
console.log(arr.length);
почему 4?)) */


/* function F() { return F; }

alert( new F() instanceof F );
alert( new F() instanceof Function );
почему false, true. */


/* function User() { }

let vasya = new User();

vasya.__proto__.name = "Vasya";
console.log(vasya.__proto__);
vasya.__proto__ и User.prototype ответ */



/* alert( 20e-1['toString'](2) );
почему то 10, надо посмотреть что такое  20e-1*/

/* let x = 5;
alert( x++ );
почему 5? */
