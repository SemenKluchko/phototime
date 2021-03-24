;

// declareted all constans what we need in this prjct
const d = document,
          burgerBtn = d.querySelector('.burger__btn'),
          navbar = d.querySelector('.nav__menu'),
          headerLogo = d.querySelector('.header__logotype'),
          headerDiv = d.querySelector('.header__nav'),
          modalWindow = d.querySelector('.modal-window'),
          modalLinks = d.querySelectorAll('.nav__anchor'),
          removeLogo = d.querySelector('#remove-img'),
          backLogo = d.querySelector('#back-img'),
          theHomeLink = navbar.firstChild,
          closeBtn = d.querySelector('.nav__close-btn'),
          subForm = d.querySelector('.subscribe__form'),
          subModalWindow = d.querySelector('.subscribe__modal'),
          okBtn = d.querySelector('.ok__btn '),
          EMAIL_KEY = 'Email',
          subInput = d.querySelector('.subscribe__input');


// click event on burger button should open modal window, and moving logotype at the top of ul
burgerBtn.addEventListener('click', () => {
    modalWindow.append(navbar);
    modalWindow.classList.add('active-modal');
    navbar.classList.add('modal-content');
    navbar.classList.add('active');
    navbar.insertBefore(removeLogo, theHomeLink);
  
})

// click event on each anchor link should close the modal and back logo to the third ul, first anchor will reload the page
modalLinks.forEach(item => {
    item.addEventListener('click', (event) => {
        if (event.target == theHomeLink) window.location.reload();
        modalWindow.classList.remove('active-modal');
        navbar.classList.remove('modal-content');
        navbar.classList.remove('active');
        headerDiv.append(navbar);
        navbar.insertBefore(removeLogo, backLogo);
    })
})

// bubling events on close-btn in burger menu and ok-btn in download modal error window
d.addEventListener('click', (event) => {
    if (event.target == modalWindow || event.target == closeBtn) {
            modalWindow.classList.remove('active-modal');
            navbar.classList.remove('modal-content');
            navbar.classList.remove('active');
            headerDiv.append(navbar);
            navbar.insertBefore(removeLogo, backLogo); 
    }
    if (event.target == okBtn) {
      subModalWindow.classList.remove('active-subscribe');
      d.body.classList.remove('noscroll');
    }
});

// add two slick-slider in prjct
$(document).ready(function() {
  $('.design__slider').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 5000,
          speed: 700,
          nextArrow: '.design-next',
          prevArrow: '.design-prev',
          responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                }
              }
          ],
          
  });
});

$(document).ready(function() {
  $('.comm__slider').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          cssEase: 'linear',
          autoplaySpeed: 5000,
          speed: 1000,
          arrows: true,
          initialSlide: 0,
          nextArrow: '.comm-next',
          prevArrow: '.comm-prev',
          responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
        ],
    });
});

// change numbers above first slider
$(".design__slider").on("afterChange", function (event, slick, currentSlide, nextSlide) {
  $(".slider__numbers").text(`0${currentSlide + 1}/0${slick.slideCount}`);});


// add api for second slider, upload 10 photo
const jsonUrl = "https://pixabay.com/api/?key=20825517-04c896a22dcf6a05b2f28f88a&q=iphone&image_type=photo";
$.getJSON(jsonUrl, function (json) {
  let imgList = "";
 
    $.each(json.hits, function () {
        imgList += `<img class="community__img" src= "${this.largeImageURL}">`;
      });
   
  $('.comm__slider').slick('slickAdd', imgList);
});


// simple lottie animation for error modal window 
const animation = bodymovin.loadAnimation({
  container: d.querySelector('.anim'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'loader.json'
});

// event on enter submit button, and stop the anim after 4.3s 
// get the email into localstorage
subForm.addEventListener('submit', (event) => {
  event.preventDefault();
  subModalWindow.classList.add('active-subscribe');
  d.body.classList.add('noscroll');
  window.localStorage.setItem(EMAIL_KEY, subInput.value);
})

// event on Esc button
d.addEventListener('keydown', (event) => {
  if (event.code == 'Escape') {
    subModalWindow.classList.remove('active-subscribe');
    d.body.classList.remove('noscroll');
} 
});
