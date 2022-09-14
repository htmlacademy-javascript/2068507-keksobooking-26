import {addDisableForm, removeDisableForm, showAlertError, showAlertSuccess} from './util.js';
import {sendData} from './api.js';
import {mapFilters, mainPinMarker, DEFAULT_LAT_LNG, ZOOM, map, renderMarkersWithDebounce} from './ads.js';
import {state} from './data.js';
import {resetLoadImg} from './load-img.js';

const ALERT_SHOW_TIME = 5000;

const adForm = document.querySelector('.ad-form');
const housingTypeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInInput = adForm.querySelector('#timein');
const checkOutInput = adForm.querySelector('#timeout');
const roomNumberInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetSubmit = adForm.querySelector('.ad-form__reset');
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

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'upper',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetAdForm = () => {
  adForm.reset();
  priceInput.value = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  sliderElement.noUiSlider.reset();
  capacityInput.value = '1';
  renderMarkersWithDebounce(state.adverts.slice(0, 10));
  mapFilters.reset();
  resetLoadImg();
  mainPinMarker.setLatLng({
    lat: DEFAULT_LAT_LNG.lat,
    lng: DEFAULT_LAT_LNG.lng,
  });
  map.setView(DEFAULT_LAT_LNG, ZOOM);

};

const blockSubmitButton = () => {
  submitButton.disable = true;
  submitButton.textContent = 'Сохраняю...';
  addDisableForm(adForm);
  sliderElement.setAttribute('disabled', true);
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  removeDisableForm(adForm);
  sliderElement.removeAttribute('disabled');
};

const setUserFormSubmit = (onSuccess) =>{
  adForm.addEventListener('submit',
    (evt) => {
      evt.preventDefault();
      const isValid = pristine.validate();
      if (isValid) {
        blockSubmitButton();
        sendData(
          () => {showAlertSuccess(ALERT_SHOW_TIME);
            unblockSubmitButton();
            onSuccess();
          },
          () => {
            showAlertError();
            unblockSubmitButton();
          },
          new FormData(evt.target),
        );
      }
    }
  );
};

const validatePriceInput = () => priceInput.value >= MIN_PRICE_OF_HOUSING[housingTypeInput.value];
const getPriceErrorMessage = () => {
  if (priceInput.value <= MIN_PRICE_OF_HOUSING[housingTypeInput.value]) {
    return `минимальная стоимость за ночь ${MIN_PRICE_OF_HOUSING[housingTypeInput.value]}`;
  }
};

const onHousingTypeInputChange = () => {
  const priseMinPlaceholder = MIN_PRICE_OF_HOUSING[housingTypeInput.value];
  priceInput.value = priseMinPlaceholder ;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000,
    },
    start: priseMinPlaceholder,
    step: 1,
  });
};

const validateRoomNumberInput = () => ROOM_CAPACITY[roomNumberInput.value].includes(capacityInput.value);
const getCapacityErrorMessage = () => `Размещение в ${roomNumberInput.value} ${roomNumberInput.value === '1' ? 'комнате' : 'комнатах'} для ${capacityInput.value} ${capacityInput.value === '1' ? 'гостя' : 'гостей'} невозможно`;

const onCheckInInputChange = () => {
  checkOutInput.value = checkInInput.value;
};
const onCheckOutInputChange = () => {
  checkInInput.value = checkOutInput.value ;
};

const getFormValidation = () => {
  resetAdForm();
  setUserFormSubmit(resetAdForm);
  pristine.addValidator(priceInput, validatePriceInput, getPriceErrorMessage);
  housingTypeInput.addEventListener('change', onHousingTypeInputChange);
  sliderElement.noUiSlider.on('update', () => {
    priceInput.value = sliderElement.noUiSlider.get();
  });
  pristine.addValidator(capacityInput, validateRoomNumberInput, getCapacityErrorMessage);
  pristine.addValidator(roomNumberInput, validateRoomNumberInput, getCapacityErrorMessage);
  checkInInput.addEventListener('change', onCheckInInputChange);
  checkOutInput.addEventListener('change', onCheckOutInputChange);

  resetSubmit.addEventListener('click', (evt)=>{
    evt.preventDefault();
    resetAdForm();
  });
};

getFormValidation();
