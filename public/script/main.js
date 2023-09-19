'use strict'

//Navigation menu on the phone

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-menu');
  } else {
    document.body.classList.remove('page__body--with-menu');
  }
});

//Slider for our-works block

const swiper = new Swiper('.our-works__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  speed: 900,
});

//Slider for comments block

const swiperComments = new Swiper('.comments__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  speed: 900,
});

//Answers for faq block

const plusButton = document.querySelectorAll('.faq__button');
const questionBlock = document.querySelectorAll('.faq__question-container');
const answers = [
  'Хімчистка меблів може знадобитись в результаті довгої експлуатації меблів та бажанні надати їм стан близький до нового та бажанні позбутися пилу , неприємних плям , бактерій та інших забруднень.',
  `Тривалість чистки залежить від об'єму роботи, в середньому - це від однієї до трьох годин`,
  `Ціна наданих послуг , залежить від об'єму виконаної роботи. Прейскурант ви можете знайти на сайті. Додаткові послуги обговорюються напряму з клієнтом.`,
  'При хімчистці меблів ми використовуємо сертифіковану хімію TM ERA111 , виробником якої є Туреччина.',
  'Оплата виконується переводом на рахунок ФОП і готівкою',
  'Тривалість висихання до стану, готового для експлуатації становить від 6-18 годин.',
];

plusButton.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const isExpanded = button.classList.contains('expanded');

    if (!isExpanded) {
      button.classList.add('expanded');
      button.style.backgroundImage = "url(../assets/img/minus-icon.png)";

      const answerBlock = document.createElement('p');
      answerBlock.textContent = answers[index];
      answerBlock.classList.add('faq__answer', 'page__paragraph'); 
      questionBlock[index].insertAdjacentElement('afterend', answerBlock);

      setTimeout(() => {
        answerBlock.style.maxHeight = answerBlock.scrollHeight + '0px';
        answerBlock.style.opacity = '1';
      }, 0);
    } else {
      button.classList.remove('expanded');
      button.style.backgroundImage = "url(../assets/img/plus-icon.png)";

      const answerBlock = questionBlock[index].nextElementSibling;
      if (answerBlock) {
        answerBlock.style.opacity = '0';
        answerBlock.style.margin = '0';
        answerBlock.style.maxHeight = '0';
      }
    }
  });
});

//More services button on the phone (Price block)

const moreServiceButton = document.querySelector('.price__button-more');
const allPriceBlocks = document.querySelectorAll('.price__block');
const lastFourPriceBlocks = Array.from(allPriceBlocks).slice(-4);

moreServiceButton.addEventListener('click', (e) => {
  e.preventDefault();

  lastFourPriceBlocks.forEach((block) => {
    block.style.display = 'flex';
    block.style.opacity = '1';
  });

  moreServiceButton.style.display = 'none'
});

//Counter for counter block

function startCounter(element, target) {
  let count = 0;
  const speed = 50; 

  const updateCounter = () => {
    const increment = target / speed;
    if (count < target) {
      count += increment;
      element.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter); 
    } else {
      element.innerText = target;
    }
  };

  updateCounter();
}

const counterBlocks = document.querySelectorAll('.counter__block');

function animateCounters() {
  counterBlocks.forEach((counterBlock) => {
    const counterTitle = counterBlock.querySelector('.counter__title');
    const counterNumber = counterTitle.querySelector('.counter__number');
    const target = parseInt(counterNumber.getAttribute('data-target'));

    startCounter(counterNumber, target);
  });
}

window.addEventListener('load', animateCounters);

//Form on the header

const form = document.querySelector('.header__form');
const phoneInput = document.getElementById('phone-input');
const nameInput = document.querySelector('input[type="text"]');
const submitButton = document.querySelector('.header__button');
const phoneError = document.getElementById('phone-error');
const nameError = document.getElementById('name-error');
const phonePattern = /^\d+$/;


phoneInput.addEventListener('input', () => {
  const phone = phoneInput.value;
  const isPhoneValid = phonePattern.test(phone);

  if (isPhoneValid) {
    phoneInput.classList.remove('invalid');
    phoneError.style.display = 'none';
  } else {
    phoneInput.classList.add('invalid');
    phoneError.style.display = 'block';
  }
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const phone = phoneInput.value;
  const name = nameInput.value;

  const isPhoneValid = phonePattern.test(phone);
  
  phoneInput.classList.remove('invalid');
  nameInput.classList.remove('invalid');
  
  if (!isPhoneValid || !name.trim()) {
    if (!isPhoneValid) {
      phoneInput.classList.add('invalid');
      phoneError.style.display = 'block';
    }
    if (!name) {
      nameInput.classList.add('invalid');
      nameError.style.display = 'block';
    }

    return;
  }
  
  // Оновіть цей URL на ваш сервер або сервер, який обробляє дані форми
  const serverUrl = 'http://localhost:3000';
  const telegramBotToken = '6642633947:AAHGhbzVGXD8pVfhtbbAFGDil-NdkpctAoQ';
  const chatId = '272650225';
  const message = `Телефон: ${phone}, Ім'я: ${name}`;

  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  const data = {
    chat_id: chatId,
    text: message,
  };

  fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone, name }),
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        
        return fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        alert('Помилка при відправці даних');
      }
    })
          .then(response => {
            if (response && response.ok) {
              console.log('Повідомлення відправлено успішно');
            } else {
              console.error('Помилка при відправці повідомлення в Telegram');
            }
          })
          .catch(error => {
            console.error('Помилка: ', error);
          });
});

