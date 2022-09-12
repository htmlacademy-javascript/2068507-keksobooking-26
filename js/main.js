import './data.js';
import './form.js';
import './load-img.js';
import './filter.js';
import {setAdverts} from './data.js';
import {initMap} from './ads.js';
import {getData} from './api.js';

const onSuccses = (adverts) => {
  setAdverts(adverts);// копия массива с сервера
  initMap(adverts); //массив с сервера проходится форичом
};

getData(onSuccses);

// function loadMapMarkers () {
//   getData(
//     (dataList)=>{
//       setAdverts(dataList);
//       initMap(dataList.slice(0, 10));
//     })}
// loadMapMarkers();


