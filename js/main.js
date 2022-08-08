const OBJECTS_TO_GEN = 10;

const TITLE_TEXT = [
  'Семейный отель', 'Отель Лакшери', 'Ночлежка'
//описание отеля
];
const TYPE_ARRAY = [
  'palace', 'flat', 'house', 'bungalow', 'hotel'
];
const CHECKIN_TIME = [
  '12:00', '13:00', '14:00'
];
const DESCRIPTION = [
  'Лучший отель Поволжья', 'Отель по доступным ценам', 'Рядом с прогулочной улицей', 'Бассейн и фитнес для наших гостей'
];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomPositiveNumber = (min, max, x) => { //рандомное число с количеством 0 после запятой
  if(min >= max || max < 0){
    max = false;
  } else {
    const rand = Math.random() * (max - min) + min;
    return rand.toFixed(x);
  }
};

const createLocatoin = () =>({
  lat: getRandomPositiveNumber( 35.65000, 35.70000, 5),
  lng: getRandomPositiveNumber( 139.70000, 139.80000, 5)
});

const getRandomValue = (a) => { //рандомный элемент из объекта
  const random = Math.floor(Math.random() * a.length);
  return a[random];
};

const createAvatar = (id) => ({
  avatar: (`img/avatars/user-${id.toString().padStart(2, '0')}.png`)
});

const createArrayString = (id) =>{
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
};

const createOfferArray = (locat) => ({
  title: getRandomValue(TITLE_TEXT),
  adress: `location lat - ${locat.lat}, location lng - ${locat.lng}`,
  price: getRandomPositiveNumber(5000, 10000, 0),
  type: getRandomValue(TYPE_ARRAY),
  rooms: getRandomPositiveNumber(1, 2, 0),
  guests: getRandomPositiveNumber(1, 10, 0),
  checkin: getRandomValue(CHECKIN_TIME),
  checkout: getRandomValue(CHECKIN_TIME),
  features: createArrayString(FEATURES),
  description: getRandomValue(DESCRIPTION),
  photos: createArrayString(PHOTOS),
});

const createObjects = (a) => {
  const location = createLocatoin();
  return {
    author: createAvatar(a+1),
    location,
    offer: createOfferArray(location)
  };
};

const generateObjects = (count) => {
  const object = [];
  for (let i = 0; i < count; i++){
    object.push(createObjects(i));
  }
  return object;
};

const randomObjectUser = generateObjects(OBJECTS_TO_GEN);

console.log(randomObjectUser);

