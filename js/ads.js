import {addDisableForm,removeDisableForm, debounce} from './util.js';

const ZOOM = 12;
const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};

const mapFilters = document.querySelector('.map__filters');
const mapCanvastContainer = document.querySelector('#map-canvas');
const addressInputElement = document.querySelector('#address');
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
const makeFormActive = () => {
  removeDisableForm(mapFilters);
  removeDisableForm(mapCanvastContainer);
};

const checkDataPresentation = (addClassHidden, array) => {
  Object.keys(array).forEach((key) => {
    if (!key) {
      addClassHidden.querySelector(`.popup__${OfferKeys[key]}`).classList.add('hidden');
    }
  });
};


const createImage = (srcKey) => {
  const newImage = document.createElement('img');
  newImage.classList.add('.popup__photo');
  newImage.width = '45';
  newImage.height = '40';
  newImage.alt = 'Фото жилья';
  newImage.src = srcKey;
  return newImage;
};

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

  if(photos !== undefined){
    popupPhoto.remove();
    for(let i = 0; i< photos.length; i++){
      popupPhotos.append(createImage(photos[i]));
    }
  } else {
    popupPhoto.remove();
  }
  if(features !== undefined){
    featureList.forEach((featureListItem) => {
      const isNecessary = featuresItem.some((feature) =>
        featureListItem.classList.contains(`popup__feature--${feature}`));
      if(!isNecessary){
        featureListItem.remove();
      }
    });
  }
  return relatedAds;
};

function onDefaultMap () {
  addressInputElement.value = `${DEFAULT_LAT_LNG.lat} ${DEFAULT_LAT_LNG.lng}`;
}

const map = L.map('map-canvas')
  .on('load', onDefaultMap)
  .setView({
    lat: 35.70876,
    lng: 139.74078,
  }, ZOOM);

//слой карта
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerGroup = L.layerGroup().addTo(map);
const createMarkers = (point)=>{
  const marker = L.marker(
    {
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      icon: pinIcon,
    });

  marker
    .addTo(markerGroup)
    .bindPopup(getPopupToMap(point));
};

const mainPinMarker = L.marker({
  lat: 35.70876,
  lng: 139.74078,
},
{
  draggable: true,
  icon: mainPinIcon,
},);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt)=>{
  const latLng = evt.target.getLatLng();
  addressInputElement.value = `${(latLng.lat).toFixed(5)}; ${(latLng.lng).toFixed(5)} `;
});

const renderMarkers = (offers) => {
  markerGroup.clearLayers();
  offers.forEach((offer) => createMarkers(offer));
};
const initMap = (offers) => {
  renderMarkers(offers);
  makeFormActive();
};

const renderMarkersWithDebounce = (offers) => debounce(() => renderMarkers(offers))();
export {createMarkers, markerGroup, mapFilters,  mainPinMarker, DEFAULT_LAT_LNG, ZOOM, map, renderMarkersWithDebounce, initMap};

