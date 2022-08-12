import {randomObjectUser} from './data.js';

const TYPES_DESCRIPTION = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};
const OFFER_KEYS = {
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

const checkDataPresentation = (object, objectKeys) => {//похищенная функция у соседа для скрытия пустых полей
  Object.keys(objectKeys).forEach((key) => {
    if (!key) {
      object.querySelector(`.popup__${OFFER_KEYS[key]}`).classList.add('hidden');
    }
  });
};

const createImage = (srcKey) => {//функция для отрисовки аппартаментов
  const newImage = document.createElement('img');
  newImage.classList.add('.popup__photo');
  newImage.width = '45';
  newImage.height = '40';
  newImage.alt = 'Фото жилья';
  newImage.src = srcKey;
  return newImage;
};

const cardElementTemplate = document.querySelector('#card').content.querySelector('article.popup');
const mapCanvastContainer = document.querySelector('#map-canvas');
const cardElementFragment = document.createDocumentFragment();

const getRelatedAds = () => {
  mapCanvastContainer.innerHTML = '';

  randomObjectUser.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
    const relatedAds = cardElementTemplate.cloneNode(true);//создаю клон шаблона с данными
    // checkDataPresentation(relatedAds, {avatar, title, address,price, type, rooms, guests, checkin, checkout, features, description, photos});
    const popupPhotos = relatedAds.querySelector('.popup__photos');
    const popupPhoto = relatedAds.querySelector('.popup__photo');

    const featureList = relatedAds.querySelectorAll('.popup__feature');
    const featuresItem = features;

    checkDataPresentation(relatedAds, {title, address,price, type, rooms, guests, checkin, checkout, features, description, photos});

    relatedAds.querySelector('.popup__title').textContent = title;
    relatedAds.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
    relatedAds.querySelector('.popup__type').textContent = TYPES_DESCRIPTION[type];
    relatedAds.querySelector('.popup__text--address').textContent = address;
    relatedAds.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
    relatedAds.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    relatedAds.querySelector('.popup__description').textContent = description;
    relatedAds.querySelector('.popup__avatar').src = avatar;

    for(let i = 0; i< photos.length; i++){//фотографии
      popupPhotos.append(createImage(photos[i]));
    }
    popupPhoto.remove();

    featureList.forEach((featureListItem) => { //с помощью some сравниваю сгенерарованные features с строками в HTML
      const isNecessary = featuresItem.some((feature) =>
        featureListItem.classList.contains(`popup__feature--${feature}`));//конструкция проверки
      if(!isNecessary){
        featureListItem.remove();
      }
    });

    cardElementFragment.append(relatedAds);
  });
  mapCanvastContainer.append(cardElementFragment.lastElementChild);//добавил в блок первый элемен форича

};
console.log(mapCanvastContainer);
export {getRelatedAds};
