
$( document ).ready(function() {
    AOS.init({
     duration: 1200,
     once: true,
    });

  $('.refrences_slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
    
  });

 
});










if ($(window).width() <=767){

  $(".navbar-toggler").click(function(){
    $(this).toggleClass("show");
    $("body").toggleClass("active_header");
  });
 
  // for open mobile menu
  $(".nav-item").addClass('show');
  $(".nav-item  .dropdown-toggle").removeAttr("href");
  $(".dropdown-menu").addClass('show'); 

  $(".navbar-toggler").click(function(){
    $("header").toggleClass("transparent_bg");
    $("body").toggleClass("active_header");
  });
  $("a.nav-link").click(function(){
    $("body").removeClass('header-active');
    $(".dropdown-menu").toggleClass('show'); 
    $("#collapsibleNavbar").toggleClass('show');
    $(".navbar-toggler").toggleClass('show');

  }); 

  (function(){
    var burger = document.querySelector('.navbar-toggler'),

	    body = document.querySelector('body');
    
      burger.onclick = function() {
      body.classList.toggle('header-active');
      }
}());
}

    
    
// // smooth scroll

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 150
  }, 500);
});







