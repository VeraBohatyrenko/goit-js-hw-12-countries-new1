import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

import API from './js/fetchCountries';
import getRefs from './js/refs';
import itemCountryTmp from './templates/item-country';
import countryCardTmp from './templates/country-card';
import debounce from 'lodash.debounce';

const refs = getRefs();
refs.input.addEventListener(
  'input',
  debounce(e => onSearch(e.target.value), 500),
);

function onSearch(searchQuery) {
  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(() => error({ title: 'sorry', delay: 2000, text: 'Nothing found' }));
}

function renderCountryCard(data) {
  refs.articlesContainer.innerHTML = '';
  if (data.length === 1) {
    const markUp = countryCardTmp(data);
    refs.articlesContainer.innerHTML = markUp;
  }
  if (data.length > 1 && data.length <= 10) {
    const markUp = itemCountryTmp(data);
    refs.articlesContainer.innerHTML = markUp;
  }
  if (data.length > 10) {
    error({
      title: 'sorry',
      delay: 2000,
      text: 'Too many mutches found. Please enter a more specific query!',
    });
  }
}
