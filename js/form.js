import {addDisableForm} from './util.js';

const adForm = document.querySelector('.ad-form');
const housingTypeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInInput = adForm.querySelector('#timein');
const checkOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');

//слайдер на инпут прайса
const sliderElement = document.querySelector('.ad-form__slider');

const ROOM_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const MIN_PRICE_OF_HOUSING = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
  'hotel': 3000
};

const pristine = new Pristine (adForm,
  {
    classTo: 'pristine-custom',
    errorClass: 'pristine-custom--invalid',
    successClass: 'pristine-custom--valid',
    errorTextParent: 'pristine-custom',
    errorTextClass: 'text-pristine',
    errorTextTag: 'div'
  }
);

//(1)функция обработки события отправки формы для передачи по ссылке
const onAdFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  } else {
    addDisableForm(adForm);//блокируем форму после нажатия
  }
};

//(2)функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
const validatePriceInput = () => priceInput.value >= MIN_PRICE_OF_HOUSING[housingTypeInput.value];//сравниваем => получаем тру или фолс
const getPriceErrorMessage = () => {
  if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
    return `минимальная стоимость за ночь ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
    //если в верхней функции false то выдает как ощибку с описанием
  }
};

//создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'upper',
  format: {
    to: function (value) {// to обращение к set
      if (Number.isInteger(value)) {//isInteger проеряет целочисленное число
        return value.toFixed(0);
      }
      return value.toFixed(0);//знаков после запятой
    },
    from: function (value) {//from обращение  к get
      return parseFloat(value);
    },
  },
});
// способ блокировки слайдера
sliderElement.setAttribute('disabled', true);//заблокировать слайдер
sliderElement.removeAttribute('disabled');//разблокировать слайдер
//способ удаления слайдера оставил ПРОЗАПАС
// sliderElement.noUiSlider.destroy();

//(3)функция  обработки изменения поля с выбором жилья и параметры  сладера в зависимости от вбора жилья
const onHousingTypeInputChange = () => {
  const priseMinPlaceholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  priceInput.min = priseMinPlaceholder;
  priceInput.value = priseMinPlaceholder ;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: priseMinPlaceholder,
      max: 100000,
    },
    start: priseMinPlaceholder,
    step: 1,
  });
  // sliderElement.noUiSlider.set(priseMinPlaceholder);// альтернатива старта
};

//(4)функции для валидации полей с количеством комнат и количеством гостей и генерация сообщения об ошибке
const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInput.value].includes(capacityInput.value);
const getCapacityErrorMessage = () => `Размещение в ${roomNumberInput.value} ${roomNumberInput.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInput.value} ${capacityInput.value === '1' ? 'гостя' : 'гостей'} невозможно`;

//(5)функции синхронизации для чекина и чекаута при изменении значения одного из полей
const onCheckInOutInputChange = () => {
  checkOutInput.value = checkInInput.value;
};
//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  capacityInput.value = '2';
};

//функция из всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  //(1)
  adForm.addEventListener('submit', onAdFormSubmit);

  //(2)блок прайса и типа жилья
  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);//1 елемент, 2 если тру 3 если false
  //(3)
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);
  sliderElement.noUiSlider.on('update', (/*...rest*/) => {
    // console.log(rest);
    priceInput.value = sliderElement.noUiSlider.get();//слайдер переносит в поле цену
  });

  //(4)валидация комнат и кол-ва человек
  pristine.addValidator(capacityInput, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInput, validateRoomNumberInput, getCapacityErrorMessage);
  //(5)
  checkInInput.addEventListener('change', onCheckInOutInputChange);//использу одну функцию чтоб синхронизировать время
  checkOutInput.addEventListener('change', onCheckInOutInputChange);
};

resetAdForm();
getFormValidation();

