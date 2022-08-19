import {randomObjectUser} from './data.js';

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
const createImage = (srcKey) => {
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
const createCardElementFragment = document.createDocumentFragment();

const getRelatedAds = () => {
  mapCanvastContainer.innerHTML = '';

  randomObjectUser.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
    const relatedAds = cardElementTemplate.cloneNode(true);//создаю клон шаблона с данными

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
    for(let i = 0; i< photos.length; i++){
      popupPhotos.append(createImage(photos[i]));
    }
    popupPhoto.remove();

    //с помощью some сравниваю сгенерарованные features с строками в HTML
    featureList.forEach((featureListItem) => {
      const isNecessary = featuresItem.some((feature) =>
        featureListItem.classList.contains(`popup__feature--${feature}`));//конструкция проверки
      if(!isNecessary){
        featureListItem.remove();
      }
    });

    createCardElementFragment.append(relatedAds);
  });
  mapCanvastContainer.append(createCardElementFragment.lastElementChild);
  //добавил в блок первый элемен форича
};
//console.log(mapCanvastContainer);
export {getRelatedAds};
