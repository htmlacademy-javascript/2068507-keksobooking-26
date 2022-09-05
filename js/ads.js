// import {randomObjectUser} from './data.js';
import {addDisableForm, removeDisableForm} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const mapCanvastContainer = document.querySelector('#map-canvas');
addDisableForm(mapCanvastContainer);
addDisableForm(mapFilters);

const TypesDescription = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const OfferKeys = {
  title: 'title',
  address: 'text--address',
  price: 'text--price',
  type: 'type',
  rooms: 'text--capacity',
  guests: 'text--capacity',
  checkin: 'text--time',
  checkout: 'text--time',
  features: 'features',
  description: 'description',
  photos: 'photos',
};

//похищенная функция у соседа для скрытия пустых полей
const checkDataPresentation = (addClassHidden, array) => {
  Object.keys(array).forEach((key) => {
    if (!key) {
      addClassHidden.querySelector(`.popup__${OfferKeys[key]}`).classList.add('hidden');
    }
  });
};

//функция для отрисовки аппартаментов
// const popupPhotosObject = (photos)=>{
  const createImage = (srcKey) => {
    const newImage = document.createElement('img');
    newImage.classList.add('.popup__photo');
    newImage.width = '45';
    newImage.height = '40';
    newImage.alt = 'Фото жилья';
    newImage.src = srcKey;
    return newImage;
  };
//   const popupPhotos = document.querySelector('.popup__photos');
//   const popupPhoto = document.querySelector('.popup__photo');

//   for(let i = 0; i< photos.length; i++){
//     popupPhotos.append(createImage(photos[i]));
//   }
//   popupPhoto.remove();
// };
//функция на отрисовку в балуне с помощью темплейта
const getPopupToMap = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardElementTemplate = document.querySelector('#card').content.querySelector('article.popup');
  const relatedAds = cardElementTemplate.cloneNode(true);

  const popupPhotos = relatedAds.querySelector('.popup__photos');
  const popupPhoto = relatedAds.querySelector('.popup__photo');

  const featureList = relatedAds.querySelectorAll('.popup__feature');
  const featuresItem = features;

  checkDataPresentation(relatedAds, {title, address,price, type, rooms, guests, checkin, checkout, features, description, photos});
  relatedAds.querySelector('.popup__title').textContent = title;
  relatedAds.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  relatedAds.querySelector('.popup__type').textContent = TypesDescription[type];
  relatedAds.querySelector('.popup__text--address').textContent = address;
  relatedAds.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  relatedAds.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  relatedAds.querySelector('.popup__description').textContent = description;
  relatedAds.querySelector('.popup__avatar').src = avatar;
  //добавить фотографии
  if(photos !== undefined){//проверка на наличие фотографий
    for(let i = 0; i< photos.length; i++){
      popupPhotos.append(createImage(photos[i]));
    }
    popupPhoto.remove();
  } else {
    popupPhoto.remove();
  }
  // //проверяю есть ли элемент feature в объявлении и если нету удаляю из ДОМ строку
  if(features !== undefined){
    featureList.forEach((featureListItem) => {
      const isNecessary = featuresItem.some((feature) =>
        featureListItem.classList.contains(`popup__feature--${feature}`));//конструкция проверки
      if(!isNecessary){
        featureListItem.remove();
      }
    });
  }
  return relatedAds;
};

//подключаем лифлет
const map = L.map('map-canvas')
  .on('load', ()=>{//отключаем блокировки карты
    removeDisableForm(mapFilters);
    removeDisableForm(mapCanvastContainer);
  })
  .setView({
    lat: 35.70876,
    lng: 139.74078,
  }, 16);

//слой карта
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//подключаем заготовленные иконки
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],//пареметры указателя иконки
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

//слой для фильтрации
const markerGroup = L.layerGroup().addTo(map);
//функция создания меток
const createMarkers = (point)=>{
  const {lat, lng} = point.location ; //где же такое видано?
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    });

  marker
    .addTo(markerGroup)// добавляем в карту
    .bindPopup(getPopupToMap(point));
};

const renderSimilarList = (rooms)=>{
//с помощью форича ищем кординаты и добавляем на карту несколько меток
  rooms.forEach((point) => {
    createMarkers(point);
  });
};
//настройки главного маркера
const mainPinMarker = L.marker({
  lat: 35.70876,
  lng: 139.74078,
},
{
  draggable: true,//метку можно перемещать по карте
  icon: mainPinIcon,
},);
mainPinMarker.addTo(map);//добавляем маркер на карту
//ниже КОД Я пока оставлю, для следующий заданий
// .bindPopup();
// mainPinMarker.on('moveend', (evt)=>{
//   console.log(evt.target.getLatLng());//создать отрисовку в координаты
// });

//проверка координат
// resetButton.addEventListener('click', ()=>{
// //возврат маркера
//   mainPinMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });

//   //возврат на правильный масштаб и фокус
//   map.setView({
//     lat: 59.96831,
//     lng: 30.31748,
//   }, 16);
// });

//удаление метки
//mainPinMarker.remove();
//очистить слой
//markerGroup.clearLayers()
export {renderSimilarList};
