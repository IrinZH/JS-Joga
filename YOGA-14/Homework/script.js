$(document).ready(function () { //Ждет полной загрузки страницы
  const showModal = () => {
      event.preventDefault();
      $('.overlay').fadeIn(2000);
      $('.modal').show('slow');
};

  $('.main_btna').on('click', showModal);
  $('.main_btn').on('click', showModal);
  $('nav li:eq(1)').on('click', showModal);
  //так тоже работает для 2 пункта меню :

  // $('nav a:eq(1)').on('click', showModal); 
  // $('ul li:eq(1)').on('click', showModal);
  // $('ul').find('li:eq(1)').on('click', showModal);
  // $('[href="#sheldure"]').on('click', showModal);

  // закрытие модального окна
  $('.close').on('click',function () {
    $('.overlay').fadeOut(2000);
    $('.modal').hide('slow');
  });
});