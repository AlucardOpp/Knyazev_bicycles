'use strict';

const NUMBERS = /^[^a-zA-Zа-яА-Я]+$/;

const pageHeaderWrapper = document.querySelector('.page-header__wrapper');
const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav__toggle');
const inputName = document.querySelector("#name");
const inputTel = document.querySelector('#tel');
const form = document.querySelector(".form");
const body = document.querySelector(".body");
const links = mainNav.querySelectorAll("a");

const isStorageSupport = true;
let storageName = '';
let storageTel = '';

try {
  storageName = localStorage.getItem('name');
  storageTel = localStorage.getItem('tel')
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  inputName.value = storageName;
}
if (storageTel) {
  inputTel.value = storageTel;
}

if (pageHeaderWrapper) {
  pageHeaderWrapper.classList.remove('page-header__wrapper--nojs');
}


if (mainNav && mainNavToggle) {
  mainNav.classList.remove('main-nav--nojs');
  mainNavToggle.classList.remove('main-nav__toggle--nojs');

  mainNavToggle.addEventListener('click', () => {
    mainNavToggle.classList.toggle('main-nav__toggle--opened');
    mainNav.classList.toggle('main-nav--opened');
    body.classList.toggle('body--overflow-hidden');
  });
  links.forEach(link => {
    link.addEventListener('click', () => {
      mainNavToggle.classList.toggle('main-nav__toggle--opened');
      mainNav.classList.toggle('main-nav--opened');
      body.classList.toggle('body--overflow-hidden');
    });
  });
}

if (inputTel) {
  inputTel.addEventListener('input', () => {
    const inputValue = inputTel.value;

    if (!inputValue) {
      inputTel.setCustomValidity('Обязательное поле');
    } else if (!NUMBERS.test(inputValue)) {
      inputTel.setCustomValidity('В данном поле требуются только цифры');
    } else {
      inputTel.setCustomValidity('');
    }
    inputTel.reportValidity();
  })
}

if (form) {
  form.addEventListener('submit', (evt) => {
    if (isStorageSupport) {
      if (inputTel.value) {
        localStorage.setItem('tel', inputTel.value);
      }
      if (inputName.value) {
        localStorage.setItem('name', inputName.value);
      }
    }
  });
}

$('a[href*="#"]').on('click', function(evt) {
  evt.preventDefault();
  const anchor = $(this).attr('href');
  $('html, body').stop().animate({
    scrollTop: $(anchor).offset().top - 60
  }, 800);
});
