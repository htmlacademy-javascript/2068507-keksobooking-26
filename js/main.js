import './data.js';
import './form.js';
import './filter.js';
import {setAdverts} from './data.js';
import {initMap} from './ads.js';
import {getData} from './api.js';

const onSuccses = (adverts) => {
  setAdverts(adverts);
  initMap(adverts);
};

getData(onSuccses);
