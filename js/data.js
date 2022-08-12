import {getRandomPositiveNumber, getRandomValue} from './util.js';

const OBJECTS_TO_GEN = 10;

const TITLE_TEXT = [
  'Семейный отель',
  'Отель Лакшери',
  'Ночлежка'
//описание отеля
];
const TYPE_ARRAY = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const CHECKIN_TIME = [
  '12:00', '13:00', '14:00'
];//
const DESCRIPTION = [
  'Лучший отель Поволжья',
  'Отель по доступным ценам',
  'Рядом с прогулочной улицей',
  'Бассейн и фитнес для наших гостей'
];
const FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const generateLocatoin = () =>({
  lat: getRandomPositiveNumber( 35.65000, 35.70000, 5),
  lng: getRandomPositiveNumber( 139.70000, 139.80000, 5)
});//генерация локации

const getAvatar = (id) => ({
  avatar: (`img/avatars/user${id.toString().padStart(2, '0')}.png`)
});//фото аватара

const generateRandomArrayValues = (id) =>{
  const array = [];
  const arrayLength = getRandomPositiveNumber(1, id.length);
  for (let i = 0; i < arrayLength; i++) {
    const indexArray = getRandomPositiveNumber(0, id.length-1);
    const getFeature = id[indexArray];
    if(!array.includes(getFeature)){
      array.push(getFeature);
    }
  }
  return array;
};//генерация массива случайной длинны из значений(количество и единицы)

const getOfferArray = (locat) => ({
  title: getRandomValue(TITLE_TEXT),
  adress: ` ${locat.lat}, ${locat.lng}`,
  price: getRandomPositiveNumber(5000, 10000, 0),
  type: getRandomValue(TYPE_ARRAY),
  rooms: getRandomPositiveNumber(1, 2, 0),
  guests: getRandomPositiveNumber(1, 10, 0),
  checkin: getRandomValue(CHECKIN_TIME),
  checkout: getRandomValue(CHECKIN_TIME),
  features: generateRandomArrayValues(FEATURES),
  description: getRandomValue(DESCRIPTION),
  photos: generateRandomArrayValues(PHOTOS),
});// строка offer

const createObjects = (a) => {
  const location = generateLocatoin();
  return {
    author: getAvatar(a+1),
    location,
    offer: getOfferArray(location)
  };
};//создание одного объекта

const generateObjects = (count) => {
  const object = [];
  for (let i = 0; i < count; i++){
    object.push(createObjects(i));
  }
  return object;
};//создание массива объектов

const randomObjectUser = generateObjects(OBJECTS_TO_GEN);


export {randomObjectUser};
