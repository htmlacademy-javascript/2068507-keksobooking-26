const TIMEOUT_DELAY = 500;

//функция для деактивации форм
const addDisableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
};
const removeDisableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
};
//див сверху на ошибку загрузки данных
const showAlertErrLoad = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';
  alertContainer.style.color = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};
//всплывающее окно на ошибку, копируем контент и вставляем в конец разметки
const showAlertError = () => {
  const error = document.querySelector('#error').content.querySelector('.error');
  const errorClone = error.cloneNode(true);
  const buttonReset = errorClone.querySelector('.error__button');
  buttonReset.addEventListener('click', ()=>{
    errorClone.remove();
  });
  document.body.append(errorClone);
};

//всплывающее окно на успешную отправку данных
const showAlertSuccess = (time) => {
  const onSuccess = document.querySelector('#success').content.querySelector('.success');
  const succsesClone = onSuccess.cloneNode(true);
  document.body.append(succsesClone);

  setTimeout(() => {
    succsesClone.remove();
  }, time);
};

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {addDisableForm, removeDisableForm, showAlertErrLoad, showAlertError, showAlertSuccess, debounce, TIMEOUT_DELAY};
