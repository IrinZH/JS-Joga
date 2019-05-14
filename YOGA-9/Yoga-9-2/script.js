
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


