
//const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

//функция для ввода в неактивное состояние формы
const disabledForm = (form) => {
  form.classList.add(`${form}--disabled`);
};

//функция для актив. состояния формы
// const enabledForm = (form) => {
//   form.classList.remove(`${form}--disabled`);
// };

disabledForm(mapFilters);
//disabledForm(adForm);

