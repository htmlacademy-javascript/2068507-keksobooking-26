import {state} from './data.js';
import {renderMarkersWithDebounce} from './map.js';

const DEFAULT_VALUE = 'any';
const LOW_PRICE_VALUE = 10000;
const HIGH_PRICE_VALUE = 50000;

const filtersContainer = document.querySelector('.map__filters');
const typeFilterElement = filtersContainer.querySelector('#housing-type');
const priceFilterElement = filtersContainer.querySelector('#housing-price');
const roomsFilterElement = filtersContainer.querySelector('#housing-rooms');
const guestsFilterElement = filtersContainer.querySelector('#housing-guests');
const housingFeaturesElement = filtersContainer.querySelector('#housing-features');

const getTypeFilterValue = (advert) => advert.offer.type === typeFilterElement.value || typeFilterElement.value === DEFAULT_VALUE;
const getRoomsFilterValue = (advert) => advert.offer.rooms === Number(roomsFilterElement.value) || roomsFilterElement.value === DEFAULT_VALUE;
const getGuestsFilterValue = (advert) => advert.offer.guests === Number(guestsFilterElement.value) || guestsFilterElement.value === DEFAULT_VALUE;

const getPriceFilterValue = (advert) => {
  const getPriceValue = () => {
    if (Number(advert.offer.price) < LOW_PRICE_VALUE) {return 'low';}
    if (Number(advert.offer.price) > HIGH_PRICE_VALUE) {return 'high';}
    if (Number(advert.offer.price) > LOW_PRICE_VALUE && Number(advert.offer.price) < HIGH_PRICE_VALUE) {return 'middle';}
  };

  return getPriceValue() === priceFilterElement.value || priceFilterElement.value === DEFAULT_VALUE;
};

const getCheckedFeaturesValue = (advert) => {
  const checkedFeatures = document.querySelectorAll('[name="features"]:checked');
  const checkedFeaturesArray = Array.from(checkedFeatures).map((item) => item.value);
  return checkedFeaturesArray.every((el) => {
    if (advert.offer.features) {
      return advert.offer.features.includes(el);
    }
  });
};

const getAdvertFilters = (advert) =>
  getRoomsFilterValue(advert) &&
  getTypeFilterValue(advert) &&
  getPriceFilterValue(advert) &&
  getGuestsFilterValue(advert) &&
  getCheckedFeaturesValue(advert);

const onChangeFilter = () => {
  const filteredAdverts = state.adverts.filter((el) => getAdvertFilters(el));
  renderMarkersWithDebounce(filteredAdverts.slice(0, 10));
};

typeFilterElement.addEventListener('change', onChangeFilter);
priceFilterElement.addEventListener('change', onChangeFilter);
roomsFilterElement.addEventListener('change', onChangeFilter);
guestsFilterElement.addEventListener('change', onChangeFilter);
housingFeaturesElement.addEventListener('change', onChangeFilter);

