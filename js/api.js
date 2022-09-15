import {showAlertErrLoad} from './util.js';

//загрузка данных
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Данные не загружены!!!');
      }
    })
    .then((room) => onSuccess(room))
    .catch(()=>{showAlertErrLoad('Данные не загружены!!!');});
};

//отправка данных
const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response)=>{
      if(response.ok){
        onSuccess();
      }else {
        onFail();
      }})
    .catch(() => {
      onFail();});
};
export {getData, sendData};
