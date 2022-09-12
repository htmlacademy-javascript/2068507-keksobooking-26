import {showAlertErrLoad} from './util.js';
// import {onMapFilterElementChange, filteredOffers} from './filter-map.js';

const getPriceList = (price) =>{
  // if(price >= PriceRanges.any.minPrice && price <= PriceRanges.any.maxPrice ){
  //   return 'any';
  // }
  if(price >= PriceRanges.low.minPrice && price <= PriceRanges.low.maxPrice ){
    return 'low';
  }
  if(price >= PriceRanges.middle.minPrice && price <= PriceRanges.middle.maxPrice ){
    return 'middle';
  }
  if(price >= PriceRanges.high.minPrice && price <= PriceRanges.high.maxPrice ){
    return 'high';
  }
};
// console.log(getPriceList(30000))
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
// console.log(getData());

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
