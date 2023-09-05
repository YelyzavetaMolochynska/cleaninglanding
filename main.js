const swiper = new Swiper('.our-works__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  speed: 900,
});

const swiperComments = new Swiper('.comments__swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  speed: 900,
});

const plusButton = document.querySelectorAll('.faq__button');
const questionBlock = document.querySelectorAll('.faq__question-container');
const answers = [
  'Хімчистка меблів може знадобитись в результаті довгої експлуатації меблів та бажанні надати їм стан близький до нового та бажанні позбутися пилу , неприємних плям , бактерій та інших забруднень.',
  `Тривалість чистки залежить від об'єму роботи, в середньому - це від однієї до трьох годин`,
  `Ціна наданих послуг , залежить від об'єму виконаної роботи. Прейскурант ви можете знайти на сайті. Додаткові послуги обговорюються напряму з клієнтом.`,
  'При хімчистці меблів ми використовуємо сертифіковану хімію TM ERA111 , виробником якої є Туреччина.',
  'Оплата проводиться в готівковій та безготівковій формі(переказ з карти на карту).',
  'Тривалість висихання до стану, готового для експлуатації становить від 6-18 годин.',
];

plusButton.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const isExpanded = button.classList.contains('expanded');

    if (!isExpanded) {
      button.classList.add('expanded');
      button.style.backgroundImage = "url('../assets/img/minus-icon.png')";

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
      button.style.backgroundImage = "url('../assets/img/plus-icon.png')";

      const answerBlock = questionBlock[index].nextElementSibling;
      if (answerBlock) {
        answerBlock.style.opacity = '0';
        answerBlock.style.margin = '0';
        answerBlock.style.maxHeight = '0';
      }
    }
  });
});

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

// Функція, яка запускає лічильник для всіх блоків
function animateCounters() {
  counterBlocks.forEach((counterBlock) => {
    const counterTitle = counterBlock.querySelector('.counter__title');
    const counterNumber = counterTitle.querySelector('.counter__number');
    const target = parseInt(counterNumber.getAttribute('data-target'));

    startCounter(counterNumber, target);
  });
}

window.addEventListener('load', animateCounters);

