'use strict';

const NUMBERS = /[0-9]/;
const ELEVEN_NUMBERS = /[0-9]{11}/;
const MIN_MAX_TEL_LENGTH = 11;

const pageHeaderWrapper = document.querySelector('.page-header__wrapper');
const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav__toggle');
const inputTel = document.querySelector('#tel');
const form = document.querySelector(".form");

if (pageHeaderWrapper) {
  pageHeaderWrapper.classList.remove('page-header__wrapper--nojs');
}

if (mainNav && mainNavToggle) {
  mainNav.classList.remove('main-nav--nojs');
  mainNavToggle.classList.remove('main-nav__toggle--nojs');

  mainNavToggle.addEventListener('click', () => {
    mainNavToggle.classList.toggle('main-nav__toggle--opened');
    mainNav.classList.toggle('main-nav--opened');
  });
}

if (inputTel) {
  inputTel.addEventListener('input', () => {
    const inputValue = inputTel.value;
    const valueLength = inputTel.value.length;

    if (!inputValue) {
      inputTel.setCustomValidity('Обязательное поле');
    } else if (valueLength > MIN_MAX_TEL_LENGTH) {
      inputTel.setCustomValidity(`Удалите лишние ${valueLength - MIN_MAX_TEL_LENGTH} символы`);
    } else if (!NUMBERS.test(inputValue)) {
      inputTel.setCustomValidity('В данном поле требуются только цифры');
    } else if (valueLength < MIN_MAX_TEL_LENGTH) {
      inputTel.setCustomValidity(`Ещё ${MIN_MAX_TEL_LENGTH - valueLength} символа(ов)`);
    } else if (!ELEVEN_NUMBERS.test(inputValue)) {
      inputTel.setCustomValidity('В данном поле требуются только цифры');
    } else {
      inputTel.setCustomValidity('');
    }
    inputTel.reportValidity();
  })
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

// Плавный скролл по клику на якорь

$('a[href*="#"]').on('click', function(evt) {
  evt.preventDefault();
  const anchor = $(this).attr('href');
  $('html, body').stop().animate({
    scrollTop: $(anchor).offset().top - 60
  }, 800);
});
