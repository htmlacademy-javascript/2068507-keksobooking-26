import {showAlertErrLoad} from './util.js';

const SIMILAR_ROOMS_COUNT = 10;

//загрузка данных
const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((room) => {
      onSuccess(room.slice(0, SIMILAR_ROOMS_COUNT));
    })
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
        // console.log('go');
      }else {
        onFail();
      }})
    .catch(() => {
      onFail();});
};
export {getData, sendData};
