// import {getRandomPositiveNumber, getRandomValue} from './util.js';

// const OBJECTS_TO_GEN = 10;

// const TITLE_TEXT = [
//   'Семейный отель',
//   'Отель Лакшери',
//   'Ночлежка'
// ];

// const TYPE_ARRAY = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
//   'hotel'
// ];

// const CHECKIN_TIME = [
//   '12:00', '13:00', '14:00'
// ];

// const DESCRIPTION = [
//   'Лучший отель Поволжья',
//   'Отель по доступным ценам',
//   'Рядом с прогулочной улицей',
//   'Бассейн и фитнес для наших гостей'
// ];
// const FEATURES = ['wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner'];
// const PHOTOS = [
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
// ];

// //генерация локации
// const generateLocatoin = () =>({
//   lat: getRandomPositiveNumber( 35.30876, 35.90876, 5),
//   lng: getRandomPositiveNumber( 139.34078, 140.74078, 5)
// });

// //фото аватара
// const getAvatar = (id) => ({
//   avatar: (`img/avatars/user${id.toString().padStart(2, '0')}.png`)
// });

// //генерация массива случайной длинны из значений(количество и единицы)
// const getArrayValues = (id) =>{
//   const array = [];
//   const arrayLength = getRandomPositiveNumber(1, id.length);
//   for (let i = 0; i < arrayLength; i++) {
//     const indexArray = getRandomPositiveNumber(0, id.length-1);
//     const getFeature = id[indexArray];
//     if(!array.includes(getFeature)){
//       array.push(getFeature);
//     }
//   }
//   return array;
// };

// // строка offer
// const getOfferArray = (locat) => ({
//   title: getRandomValue(TITLE_TEXT),
//   address: `${locat.lat}, ${locat.lng}`,
//   price: getRandomPositiveNumber(5000, 10000, 0),
//   type: getRandomValue(TYPE_ARRAY),
//   rooms: getRandomPositiveNumber(1, 2, 0),
//   guests: getRandomPositiveNumber(1, 10, 0),
//   checkin: getRandomValue(CHECKIN_TIME),
//   checkout: getRandomValue(CHECKIN_TIME),
//   features: getArrayValues(FEATURES),
//   description: getRandomValue(DESCRIPTION),
//   photos: getArrayValues(PHOTOS),
// });

// //создание одного объекта
// const createObjects = (a) => {
//   const location = generateLocatoin();
//   return {
//     author: getAvatar(a+1),
//     location,
//     offer: getOfferArray(location)
//   };
// };

// //создание массива объектов
// const generateObjects = (count) => {
//   const object = [];
//   for (let i = 0; i < count; i++){
//     object.push(createObjects(i));
//   }
//   return object;
// };

// const randomObjectUser = generateObjects(OBJECTS_TO_GEN);

const state = {

  adverts: [],

};


const setAdverts = (adverts) => {

  state.adverts = adverts;

};


export {state, setAdverts};


// export {randomObjectUser};
