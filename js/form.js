const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const housingTypeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInInput = adForm.querySelector('#timein');
const checkOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');


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

//функция для деактивации форм
const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
};

//функция для очистки формы и возвращения к первоначальным значениям
const resetAdForm = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  capacityInput.value = '3';

};

//функции синхронизации для чекина и чекаута при изменении значения одного из полей
const onCheckInOutInputChange = () => {
  checkOutInput.value = checkInInput.value;
};

//функции для валидации поля с ценой в зависимости от выбранного типа жилья и генерации сообщения об ошибке
const validatePriceInput = () => priceInput.value >= MIN_PRICE_OF_HOUSING[housingTypeInput.value];//сравниваем => получаем тру или фолс
const getPriceErrorMessage = () => {
  if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
    return `минимальная стоимость за ночь ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
    //если в верхней функции false то выдает как ощибку с описанием
  }
};

//функция  обработки изменения поля с выбором жилья
const onHousingTypeInputChange = () => {
  priceInput.min = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  priceInput.placeholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
};

//функции для валидации полей с количеством комнат и количеством гостей и генерация сообщения об ошибке
const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInput.value].includes(capacityInput.value);
const getCapacityErrorMessage = () => `Размещение в ${roomNumberInput.value} ${roomNumberInput.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInput.value} ${capacityInput.value === '1' ? 'гостя' : 'гостей'} невозможно`;

//функция обработки события отправки формы для передачи по ссылке
const onAdFormSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  } else {
    disableForm(adForm);//блокируем форму после нажатия
  }
};

//функция из всех функций связянных с валидацией и отправкой формы
const getFormValidation = () => {
  adForm.addEventListener('submit', onAdFormSubmit);

  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);//1 елемент, 2 если тру 3 если false
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);

  pristine.addValidator(capacityInput, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInput, validateRoomNumberInput, getCapacityErrorMessage);

  checkInInput.addEventListener('change', onCheckInOutInputChange);//использу одну функцию чтоб синхронизировать время
  checkOutInput.addEventListener('change', onCheckInOutInputChange);
};


disableForm(mapFilters);//блочим карту
resetAdForm();
getFormValidation();

