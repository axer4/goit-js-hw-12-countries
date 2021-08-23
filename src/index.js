import fetchCountries from './fetchCountries';
import './sass/main.scss';
const refs = {
    input: document.querySelector('.input-country'),
    countriesList: document.querySelector('.countries-list'),
}
const _ = require('lodash');
function clearMarkUp() {
    if (refs.input.value == "") {
        refs.countriesList.innerHTML = "";
    }
}
refs.input.addEventListener('input', _.debounce(fetchCountries, 500));
refs.input.addEventListener('input', clearMarkUp);

