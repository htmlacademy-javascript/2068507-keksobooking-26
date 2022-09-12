import './data.js';
import './form.js';
import {initMap} from './ads.js';
import {getData} from './api.js';
import './avatar.js';
import {setAdverts} from './data.js';

const onSuccses = (adverts) => {
  setAdverts(adverts);// копия массива с сервера(не понимаю как в него записывается)
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


