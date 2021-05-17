import './styles.css';
import template from './templates/country.hbs';
import listTemplate from './templates/all-countries.hbs';
import API from './js/fetchCountries';
import getRefs from './js/get-refs'

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css';

const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(e) {
    clearContainer();
    const input = e.target;
    // console.log(e.target);
    const searchQuery = input.value;
    // console.log(input.value);

    if (!searchQuery) {
        return;
    } else {
        API.fetchCountries(searchQuery)
            .then(updateMarkup)
            .catch(onFetchError);
    }
}

function updateMarkup(country) {
//   console.log(country.length);
  if (country.length === 1) {
    const markup = template(country);

    refs.countryContainer.insertAdjacentHTML('beforeend', markup);
  }
  if (country.length >= 2 && country.length <= 10) {
    const markup = listTemplate(country);

    refs.countryContainer.insertAdjacentHTML('beforeend', markup);
  }
  if (country && country.length >= 5) {
    error({
        title: `Too many matches found.`,
        text: `We found ${country.length} countries. Please enter a more specific query!`,
        styling:'brighttheme',
        delay: 500,
    });
  }
}

function onFetchError() {
  error({
     text: `Please enter a more specific query!`,
        styling:'brighttheme',
        delay: 500,
  });
}

function clearContainer() {
  refs.countryContainer.innerHTML = ' ';
}

